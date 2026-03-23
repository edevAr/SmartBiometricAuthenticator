"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraSnapshotService = void 0;
const common_1 = require("@nestjs/common");
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const digest_auth_util_1 = require("./digest-auth.util");
const SNAPSHOT_PATHS = [
    '/Streaming/channels/1/picture',
    '/ISAPI/Streaming/channels/101/picture',
    '/cgi-bin/snapshot.cgi?channel=1',
    '/cgi-bin/snapshot.cgi',
    '/snapshot.jpg',
    '/jpg/image.jpg',
    '/onvif-http/snapshot',
    '/api/hikvision/Streaming/channels/1/picture',
    '/video/mjpg.cgi',
];
const FETCH_TIMEOUT_MS = 3500;
const PARALLEL_BATCH = 5;
const TLS_INSECURE = process.env.CAMERA_SNAPSHOT_TLS_INSECURE === '1' ||
    process.env.CAMERA_SNAPSHOT_TLS_INSECURE === 'true';
let CameraSnapshotService = class CameraSnapshotService {
    cameraRepository;
    constructor(cameraRepository) {
        this.cameraRepository = cameraRepository;
    }
    decryptPassword(encrypted) {
        return Buffer.from(encrypted, 'base64').toString('utf8');
    }
    looksLikeJpeg(buf) {
        return buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8;
    }
    looksLikePng(buf) {
        return (buf.length > 8 &&
            buf[0] === 0x89 &&
            buf[1] === 0x50 &&
            buf[2] === 0x4e &&
            buf[3] === 0x47);
    }
    contentTypeFor(buf) {
        if (this.looksLikeJpeg(buf))
            return 'image/jpeg';
        if (this.looksLikePng(buf))
            return 'image/png';
        return 'application/octet-stream';
    }
    requestGet(urlStr, authorizationHeader) {
        return new Promise((resolve, reject) => {
            let url;
            try {
                url = new URL(urlStr);
            }
            catch {
                reject(new Error('URL inválida'));
                return;
            }
            const isHttps = url.protocol === 'https:';
            const mod = isHttps ? https : http;
            const defaultPort = isHttps ? '443' : '80';
            const port = url.port || defaultPort;
            const opts = {
                hostname: url.hostname,
                port: Number(port),
                path: `${url.pathname}${url.search}`,
                method: 'GET',
                headers: {
                    Authorization: authorizationHeader,
                    Accept: 'image/*,*/*;q=0.8',
                },
                timeout: FETCH_TIMEOUT_MS,
            };
            if (isHttps && TLS_INSECURE) {
                opts.rejectUnauthorized = false;
            }
            const req = mod.request(opts, (res) => {
                const chunks = [];
                res.on('data', (c) => chunks.push(c));
                res.on('end', () => {
                    const buf = Buffer.concat(chunks);
                    const ct = res.headers['content-type'] ?? '';
                    resolve({
                        status: res.statusCode ?? 0,
                        buf,
                        contentType: ct,
                        headers: res.headers,
                    });
                });
            });
            req.on('error', reject);
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('timeout'));
            });
            req.end();
        });
    }
    async fetchUrlWithAuth(urlStr, username, password) {
        const basic = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
        let r = await this.requestGet(urlStr, basic);
        if (r.status === 401) {
            const wwwRaw = r.headers['www-authenticate'];
            const parts = Array.isArray(wwwRaw) ? wwwRaw : wwwRaw ? [wwwRaw] : [];
            const digestLine = parts.find((h) => /digest/i.test(h));
            if (digestLine) {
                const u = new URL(urlStr);
                const requestUri = `${u.pathname}${u.search}`;
                const digestAuth = (0, digest_auth_util_1.buildDigestAuthorizationHeader)('GET', requestUri, username, password, digestLine);
                if (digestAuth) {
                    r = await this.requestGet(urlStr, digestAuth);
                }
            }
        }
        return { status: r.status, buf: r.buf, contentType: r.contentType };
    }
    isValidImage(status, buf, contentType) {
        if (status < 200 || status >= 300)
            return false;
        if (buf.length < 64)
            return false;
        return (contentType.includes('image') ||
            this.looksLikeJpeg(buf) ||
            this.looksLikePng(buf));
    }
    async fetchSnapshot(cameraId) {
        const camera = await this.cameraRepository.findById(cameraId);
        if (!camera) {
            throw new common_1.NotFoundException('Cámara no encontrada');
        }
        const password = this.decryptPassword(camera.passwordEncrypted);
        const { ipAddress, port, username } = camera;
        const urls = [];
        for (const scheme of ['http', 'https']) {
            for (const path of SNAPSHOT_PATHS) {
                urls.push(`${scheme}://${ipAddress}:${port}${path}`);
            }
        }
        const errors = [];
        for (let i = 0; i < urls.length; i += PARALLEL_BATCH) {
            const batch = urls.slice(i, i + PARALLEL_BATCH);
            const results = await Promise.all(batch.map(async (url) => {
                try {
                    const { status, buf, contentType } = await this.fetchUrlWithAuth(url, username, password);
                    if (this.isValidImage(status, buf, contentType)) {
                        return {
                            buffer: buf,
                            contentType: this.contentTypeFor(buf),
                        };
                    }
                    if (status >= 400) {
                        errors.push(`${url}: HTTP ${status}`);
                    }
                    else if (buf.length < 64) {
                        errors.push(`${url}: respuesta muy pequeña`);
                    }
                    else {
                        errors.push(`${url}: no es imagen (tipo ${contentType || '?'})`);
                    }
                }
                catch (e) {
                    const msg = e instanceof Error ? e.message : String(e);
                    errors.push(`${url}: ${msg}`);
                }
                return null;
            }));
            const hit = results.find((x) => x !== null);
            if (hit)
                return hit;
        }
        const hintTls = !TLS_INSECURE
            ? ' Si usa HTTPS con certificado propio: CAMERA_SNAPSHOT_TLS_INSECURE=1 (solo LAN de confianza).'
            : '';
        throw new common_1.BadGatewayException(`No se pudo obtener imagen (${ipAddress}:${port}). ` +
            `El navegador puede usar sesión/cookies o Digest; el servidor ya prueba Basic y Digest.${hintTls} ` +
            `Primeros errores: ${errors.slice(0, 6).join(' | ')}`);
    }
};
exports.CameraSnapshotService = CameraSnapshotService;
exports.CameraSnapshotService = CameraSnapshotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CameraRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], CameraSnapshotService);
//# sourceMappingURL=camera-snapshot.service.js.map