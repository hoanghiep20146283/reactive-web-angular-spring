import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMetadataService implements ErrorHandler {
  handleError(error: any): void {
    const date = new Date();
    console.error({
      timeStamp: date.toISOString(),
      message: error,
    });
  }
}
