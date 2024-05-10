const reverseBehaviourMap ={'Ad Posting Failure':true, 'Posting Fail % (GNL)': true};

setInterval(changeColor, 250);

function changeColor() {
    const downArrowsDiv = document.querySelectorAll('[class$="--vz--viz-billboard-element__inner"]');
    downArrowsDiv.forEach(downArrowsDiv => {
        if (downArrowsDiv.length > 0) {
             for (var looper = 0; looper < downArrowsDiv.length; looper++) {
              const divText = downArrowsDiv[looper].querySelectorAll('[class$="--vz--viz-billboard-name ok"]');
              const downArrows = downArrowsDiv[looper].querySelectorAll('[class$="--vz--viz-billboard-relative--decrease"]');
              const upArrows = downArrowsDiv[looper].querySelectorAll('[class$="--vz--viz-billboard-relative--increase"]');
              changeDownArrowColor(downArrows, divText);
              changeUpArrowColor(upArrows, divText);
            }
        }
    });
}

function changeDownArrowColor(downArrows, divText) {
    if (isItWorthTraversing(downArrows)) {
        if (isItHavingAReverseColorPattern(divText[0])) {
            setGreenColor(downArrows[0]);
        } else {
            setRedColor(downArrows[0]);
        }
    }
}

function changeUpArrowColor(upArrows, divText) {
    if (isItWorthTraversing(upArrows)) {
        if (isItHavingAReverseColorPattern(divText[0])) {
           setRedColor(upArrows[0]);
        } else {
           setGreenColor(upArrows[0]);
        }
    }
}

function isItWorthTraversing(arrows) {
    return arrows != undefined && arrows.length >= 1;
}

function isItHavingAReverseColorPattern(element) {
    return reverseBehaviourMap[element.innerHTML];
}

function setRedColor(element) {
    element.setAttribute("style", "color:#DB543B;");
}

function setGreenColor(element) {
    element.setAttribute("style", "color:#3BDB47;");
}