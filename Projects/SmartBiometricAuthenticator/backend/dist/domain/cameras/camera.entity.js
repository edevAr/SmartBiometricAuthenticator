"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = exports.CameraProtocol = void 0;
const entity_base_1 = require("../common/entity.base");
var CameraProtocol;
(function (CameraProtocol) {
    CameraProtocol["RTSP"] = "RTSP";
})(CameraProtocol || (exports.CameraProtocol = CameraProtocol = {}));
class Camera extends entity_base_1.EntityBase {
    props;
    constructor(id, props) {
        super(id);
        this.props = props;
    }
    static createNew(params) {
        const now = new Date();
        return new Camera(params.id, {
            adminId: params.adminId,
            name: params.name,
            ipAddress: params.ipAddress,
            port: params.port,
            username: params.username,
            passwordEncrypted: params.passwordEncrypted,
            rtspPath: params.rtspPath,
            location: params.location ?? null,
            isActive: true,
            createdAt: now,
            updatedAt: now,
        });
    }
    static restore(id, props) {
        return new Camera(id, props);
    }
    get adminId() {
        return this.props.adminId;
    }
    get name() {
        return this.props.name;
    }
    get ipAddress() {
        return this.props.ipAddress;
    }
    get port() {
        return this.props.port;
    }
    get username() {
        return this.props.username;
    }
    get passwordEncrypted() {
        return this.props.passwordEncrypted;
    }
    get rtspPath() {
        return this.props.rtspPath;
    }
    get location() {
        return this.props.location;
    }
    get isActive() {
        return this.props.isActive;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    deactivate() {
        this.props.isActive = false;
        this.touch();
    }
    rename(name) {
        this.props.name = name;
        this.touch();
    }
    move(location) {
        this.props.location = location ?? null;
        this.touch();
    }
    patchConnection(patch) {
        let changed = false;
        if (patch.name !== undefined) {
            this.props.name = patch.name;
            changed = true;
        }
        if (patch.ipAddress !== undefined) {
            this.props.ipAddress = patch.ipAddress;
            changed = true;
        }
        if (patch.port !== undefined) {
            this.props.port = patch.port;
            changed = true;
        }
        if (patch.username !== undefined) {
            this.props.username = patch.username;
            changed = true;
        }
        if (patch.passwordEncrypted !== undefined) {
            this.props.passwordEncrypted = patch.passwordEncrypted;
            changed = true;
        }
        if (patch.rtspPath !== undefined) {
            this.props.rtspPath = patch.rtspPath;
            changed = true;
        }
        if (patch.location !== undefined) {
            this.props.location = patch.location;
            changed = true;
        }
        if (changed)
            this.touch();
    }
    setActive(active) {
        if (this.props.isActive === active)
            return;
        this.props.isActive = active;
        this.touch();
    }
    touch() {
        this.props.updatedAt = new Date();
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.entity.js.map