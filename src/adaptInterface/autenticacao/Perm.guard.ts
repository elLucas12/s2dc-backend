import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PERMS_KEY } from "./perms.decorator";

@Injectable()
export class PermGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const permsNecessarias = this.reflector.getAllAndOverride<string[]>(PERMS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!permsNecessarias) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const temPerm = permsNecessarias.some((perm) => user?.userperm?.includes(perm));
    if (!temPerm) {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso');
    }
    return true;
  }
}