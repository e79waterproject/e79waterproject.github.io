// builds a scroller with step triggers
// using scrollama

var scroller = scrollama();


function handleStepEnter(response){
    if (response.element.style.visibility === 'hidden'){
        response.element.style.visibility = 'visible';
    }
    else
    response.element.style.opacity = 1;
}

function handleStepExit(response){
    if (response.direction === 'up'){
        if (response.element.style.visibility === 'visible'){
            response.element.style.visibility = 'hidden';
        }
        else
        response.element.style.opacity = 0;
    }
}

scroller.setup({
    step: '.scroll_trigger',
    debug: false,
    offset: 0.55
}).onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);
