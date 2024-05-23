const reverseBehaviourMap ={'Ad Posting Failure':true, 'Posting Fail % (GNL)': true};

setInterval(changeColor, 250);

function changeColor() {
    var elements = document.querySelectorAll('*');
    for (var i = 0; i < elements.length; i++) {
        var classList = elements[i].classList;
        for (var j = 0; j < classList.length; j++) {
            var className = classList[j];
            if (className.endsWith("--vz--viz-billboard-element__inner")) {
                const suffixIndex = className.lastIndexOf("--vz--viz-billboard-element__inner")
                var prefix = className.substring(0, suffixIndex);
                const downArrowsDiv = elements[i].getElementsByClassName(prefix + "--vz--viz-billboard-name ok");
                const downArrows = elements[i].getElementsByClassName(prefix + "--vz--viz-billboard-relative " + prefix + "--vz--viz-billboard-relative--no-color " + prefix + "--vz--viz-billboard-relative--decrease");
                const upArrows = elements[i].getElementsByClassName(prefix + "--vz--viz-billboard-relative " + prefix + "--vz--viz-billboard-relative--no-color " + prefix + "--vz--viz-billboard-relative--increase");
                changeDownArrowColor(downArrows, downArrowsDiv);
                changeUpArrowColor(upArrows, downArrowsDiv);
            }
        }
    }
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