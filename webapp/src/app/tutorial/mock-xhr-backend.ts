import { HttpEvent, HttpRequest, HttpResponse, HttpBackend } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
    private cardList = [
        {
            id: 1,
            name: 'Card 1',
        },
        {
            id: 2,
            name: 'Card 2',
        },
        {
            id: 2,
            name: 'Card 2',
        }
    ];

    handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
            let responseOptions;
            switch (request.method) {
                case 'GET':
                    if (request.urlWithParams.indexOf('cards?id=') >= 0) {
                        let id;
                        if (request.urlWithParams.indexOf('?') >= 0) {
                            id = request.urlWithParams.split('=')[1];
                            if (id === 'undefined') { id = ''; }
                        }
                        let cardList;
                        if (id) {
                            cardList = this.cardList.filter(card => card.id === parseInt(id));
                        } else {
                            cardList = this.cardList;
                        }
                        responseOptions = {
                            body: { cardList: JSON.parse(JSON.stringify(cardList)) },
                            status: 200
                        };
                    } else if (request.urlWithParams.indexOf('cards?name=') >= 0 || request.url === 'cards') {
                        let name;
                        if (request.urlWithParams.indexOf('?') >= 0) {
                            name = request.urlWithParams.split('=')[1];
                            if (name === 'undefined') { name = ''; }
                        }
                        let cardList;
                        if (name) {
                            cardList = this.cardList.filter(card => card.name === name);
                        } else {
                            cardList = this.cardList;
                        }
                        responseOptions = {
                            body: { cardList: JSON.parse(JSON.stringify(cardList)) },
                            status: 200
                        };
                    } else {
                        const idToFind = parseInt(request.url.split('/')[1], 10);
                        const cardList = this.cardList.filter(i => i.id === idToFind);
                        responseOptions = {
                            body: JSON.parse(JSON.stringify(cardList[0])),
                            status: 200
                        };
                    }
                    break;
                case 'POST': {
                    const card = request.body;
                    card.id = this.getNewId();
                    this.cardList.push(card);
                    responseOptions = { status: 201 };
                    break;
                }
                case 'DELETE':
                    this.deleteCard(parseInt(request.url.split('/')[1], 10));
                    responseOptions = { status: 200 };
            }

            const responseObject = new HttpResponse(responseOptions);
            responseObserver.next(responseObject);
            responseObserver.complete();
            return () => { "Completed successfully" };
        });
    }

    deleteCard(id) {
        const card = this.cardList.find(i => i.id === id);
        const index = this.cardList.indexOf(card);
        if (index >= 0) {
            this.cardList.splice(index, 1);
        }
    }

    getNewId() {
        if (this.cardList.length > 0) {
            return Math.max(...this.cardList.map(card => card.id)) + 1;
        } else {
            return 1;
        }
    }
}