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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDigestChallenge = parseDigestChallenge;
exports.buildDigestAuthorizationHeader = buildDigestAuthorizationHeader;
const crypto = __importStar(require("crypto"));
function md5(s) {
    return crypto.createHash('md5').update(s, 'utf8').digest('hex');
}
function parseDigestChallenge(wwwAuthenticate) {
    const params = {};
    const s = wwwAuthenticate.replace(/^\s*Digest\s+/i, '');
    const re = /(\w+)=("([^"]*)"|'([^']*)'|([^,\s]+))/g;
    let m;
    while ((m = re.exec(s)) !== null) {
        const key = m[1].toLowerCase();
        const value = m[3] ?? m[4] ?? m[5]?.trim() ?? '';
        params[key] = value;
    }
    return params;
}
function buildDigestAuthorizationHeader(method, requestUri, username, password, wwwAuthenticate) {
    if (!/digest/i.test(wwwAuthenticate))
        return null;
    const p = parseDigestChallenge(wwwAuthenticate);
    const realm = p.realm ?? '';
    const nonce = p.nonce ?? '';
    if (!nonce)
        return null;
    const qopRaw = (p.qop ?? '').toLowerCase();
    const useQop = qopRaw.includes('auth');
    const qop = useQop ? 'auth' : '';
    const ha1 = md5(`${username}:${realm}:${password}`);
    const ha2 = md5(`${method}:${requestUri}`);
    const nc = '00000001';
    const cnonce = crypto.randomBytes(8).toString('hex');
    let response;
    if (useQop) {
        response = md5(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`);
    }
    else {
        response = md5(`${ha1}:${nonce}:${ha2}`);
    }
    const q = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const parts = [
        `username="${q(username)}"`,
        `realm="${q(realm)}"`,
        `nonce="${q(nonce)}"`,
        `uri="${q(requestUri)}"`,
        `response="${response}"`,
    ];
    if (useQop) {
        parts.push(`qop=${qop}`, `nc=${nc}`, `cnonce="${cnonce}"`);
    }
    if (p.opaque)
        parts.push(`opaque="${q(p.opaque)}"`);
    return `Digest ${parts.join(', ')}`;
}
//# sourceMappingURL=digest-auth.util.js.map