import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    this.totalRequests++;
    if (request.method === 'GET') {
      setTimeout(() => {
        this.loadingService.setLoading(true);
      }, 0);
    }
    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.loadingService.setLoading(false);
          }
        }, 0);
      })
    );
  }
}
