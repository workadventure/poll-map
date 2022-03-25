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
            callback: () => WA.state.voteA = WA.state.voteB = WA.state.voteC = WA.state.voteD = 0,
        },
    ]

    WA.room.onEnterLayer('resetZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("resetPopup","Do you want to reset the poll?", buttons);
    })
    WA.room.onLeaveLayer('resetZone').subscribe(closePopup)

    // Voting zones
    WA.room.onEnterLayer('A').subscribe(() => (WA.state.voteA as number) ++)
    WA.room.onLeaveLayer('A').subscribe(() => (WA.state.voteA as number) --)

    WA.room.onEnterLayer('B').subscribe(() => (WA.state.voteB as number) ++)
    WA.room.onLeaveLayer('B').subscribe(() => (WA.state.voteB as number) --)

    WA.room.onEnterLayer('C').subscribe(() => (WA.state.voteC as number) ++)
    WA.room.onLeaveLayer('C').subscribe(() => (WA.state.voteC as number) --)

    WA.room.onEnterLayer('D').subscribe(() => (WA.state.voteD as number) ++)
    WA.room.onLeaveLayer('D').subscribe(() => (WA.state.voteD as number) --)

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
