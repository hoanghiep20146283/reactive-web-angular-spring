import { Component, Inject, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from 'types';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { CardService } from './services/card-service.service';
import { injectTokenExample } from '../injectToken.providers';

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

    messages: ChatRelayMessage[] = []
    users: User[] = []
    currentUser: User
    cardList;

    interpolationExample() {
        return "Interpolation Example Method";
    }
    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private cardService: CardService, @Inject(injectTokenExample) public injectDecoratorExample: string) {
        this.cardList = cardService.get();
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

    onClick(displayContent: string) {
        console.log(`Display content: ${displayContent}`);
    }
}
