import { Component, Inject, OnInit } from '@angular/core';
import { ChatMessage, User } from 'shared-types';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { CardService } from './services/card-service.service';
import { injectTokenExample } from '../injectToken.providers';
import { Card } from '../card.model';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
    title = 'I am Angular';
    accountType = "Not selected";
    textContent = "Property Binding Example"
    showPopup = false;
    inputPropertySource = "Input Property Binding Example";
    clickStatus = "Not yet";
    firstCardName = "undefined";
    messages: ChatMessage[] = []
    users: User[] = []
    currentUser: User
    cardList: Card[];

    interpolationExample() {
        return "Interpolation Example Method";
    }
    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private cardService: CardService,
        @Inject(injectTokenExample) public injectDecoratorExample: string) {
        this.cardService.get().subscribe(cardList => this.cardList = cardList);
        this.cardService.getById(1)
            .subscribe(firstCard =>
                this.firstCardName = firstCard.name);
    }

    ngOnInit(): void {
        this.accountType = "Not selected";
        this.activatedRoute.queryParams.subscribe(params => {
            console.log(`Account Type get by activated route: ${params['type']}`);
            this.accountType = params['type'];
        });
        const childRoute = this.activatedRoute.firstChild;
        if (childRoute && childRoute.params) {
            childRoute.params.forEach(param => console.log(`Child param: ${param}`))
        }

    }

    routeByClass() {
        this.router.navigate(['/tutorial/routeClass']);
    }

    getFirstCardName() {
        return this.firstCardName;
    }

    onClick(displayContent: string) {
        console.log(`Display content: ${displayContent}`);
    }
}
