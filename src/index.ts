/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { ButtonDescriptor } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    
    // Show reset tile for adminnistrators only
    if (WA.player.tags.includes('editor')) {
        WA.room.showLayer('resetZone')
    }
    
    const  buttons: ButtonDescriptor[] = [
        {
            label: 'Reset',
            className: 'error',
            callback: () => resetPoll(),
        },
        {
            label: 'Stop',
            className: 'normal',
            callback: () => stopPoll(),
        }
    ]

    WA.room.onEnterLayer('resetZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("resetPopup","Administration", buttons);
    })
    WA.room.onLeaveLayer('resetZone').subscribe(closePopup)

    // Voting zones
    WA.room.onEnterLayer('A').subscribe(() => upVote("voteA"))
    WA.room.onLeaveLayer('A').subscribe(() => downVote("voteA"))

    WA.room.onEnterLayer('B').subscribe(() => upVote("voteB"))
    WA.room.onLeaveLayer('B').subscribe(() => downVote("voteB"))

    WA.room.onEnterLayer('C').subscribe(() => upVote("voteC"))
    WA.room.onLeaveLayer('C').subscribe(() => downVote("voteC"))

    WA.room.onEnterLayer('D').subscribe(() => upVote("voteD"))
    WA.room.onLeaveLayer('D').subscribe(() => downVote("voteD"))

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
    
}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

function resetPoll(){
    WA.state.voteA = 0;
    WA.state.voteB = 0;
    WA.state.voteC = 0;
    WA.state.voteD = 0;
}

function stopPoll(){
    console.log('stop')
    // subscription.unsubscribe();
}

function upVote(answer: string){
    let answerValue = WA.state[answer] as number;
    answerValue ++;
}

function downVote(answer: string){
    let answerValue = WA.state[answer] as number;
    answerValue --;
}
