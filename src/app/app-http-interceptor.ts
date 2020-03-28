import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
    constructor(
        private as: AuthService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: this.as.token || ''
            }
        })
        return next.handle(req)
    }
}
