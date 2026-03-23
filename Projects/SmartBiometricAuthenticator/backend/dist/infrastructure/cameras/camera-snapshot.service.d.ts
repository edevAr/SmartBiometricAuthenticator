import type { CameraRepositoryPort } from '@application/cameras/ports/camera.repository';
export declare class CameraSnapshotService {
    private readonly cameraRepository;
    constructor(cameraRepository: CameraRepositoryPort);
    private decryptPassword;
    private looksLikeJpeg;
    private looksLikePng;
    private contentTypeFor;
    private requestGet;
    private fetchUrlWithAuth;
    private isValidImage;
    fetchSnapshot(cameraId: string): Promise<{
        buffer: Buffer;
        contentType: string;
    }>;
}
