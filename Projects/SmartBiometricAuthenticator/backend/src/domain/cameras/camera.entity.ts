import { EntityBase } from '../common/entity.base';

export enum CameraProtocol {
  RTSP = 'RTSP',
}

export interface CameraProps {
  adminId: string;
  name: string;
  ipAddress: string;
  port: number;
  username: string;
  passwordEncrypted: string;
  rtspPath: string;
  location?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Camera extends EntityBase<string> {
  private props: CameraProps;

  private constructor(id: string, props: CameraProps) {
    super(id);
    this.props = props;
  }

  static createNew(params: {
    id: string;
    adminId: string;
    name: string;
    ipAddress: string;
    port: number;
    username: string;
    passwordEncrypted: string;
    rtspPath: string;
    location?: string | null;
  }): Camera {
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

  static restore(id: string, props: CameraProps): Camera {
    return new Camera(id, props);
  }

  get adminId(): string {
    return this.props.adminId;
  }

  get name(): string {
    return this.props.name;
  }

  get ipAddress(): string {
    return this.props.ipAddress;
  }

  get port(): number {
    return this.props.port;
  }

  get username(): string {
    return this.props.username;
  }

  get passwordEncrypted(): string {
    return this.props.passwordEncrypted;
  }

  get rtspPath(): string {
    return this.props.rtspPath;
  }

  get location(): string | null | undefined {
    return this.props.location;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  deactivate(): void {
    this.props.isActive = false;
    this.touch();
  }

  rename(name: string): void {
    this.props.name = name;
    this.touch();
  }

  move(location?: string | null): void {
    this.props.location = location ?? null;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}

