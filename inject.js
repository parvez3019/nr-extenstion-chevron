const reverseBehaviourMap ={'Ad Posting Failure':true, 'Posting Fail % (GNL)': true};

setInterval(changeColor, 250);

function changeColor() {
    const classNames = [
     "AACAAY",
     "ABCAAY",
     "ACCAAY",
     "ADCAAY",
     "AECAAY",
     "AFCAAY",
     "AGCAAY",
     "AHCAAY",
     "AICAAY",
     "AJCAAY", 
     "AKCAAY",
     "ALCAAY",
     "AMCAAY",
     "ANCAAY",
     "AOCAAY",
     "APCAAY",
     "AQCAAY",
     "ARCAAY",
     "ASCAAY",
     "ATCAAY",
     "AUCAAY",
     "AVCAAY",
     "AWCAAY",
     "AXCAAY",
     "AYCAAY",
     "AZCAAY",
    ];
    for (var i = 0; i < classNames.length; i++) {
      const downArrowsDiv = this.document.getElementsByClassName(classNames[i]+ "--vz--viz-billboard-element__inner");
      if (downArrowsDiv.length > 0) {
         for (var looper = 0; looper < downArrowsDiv.length; looper++) {
          const divText = downArrowsDiv[looper].getElementsByClassName(classNames[i]+ "--vz--viz-billboard-name ok");
          const downArrows = downArrowsDiv[looper].getElementsByClassName(classNames[i]+ "--vz--viz-billboard-relative "+classNames[i]+ "--vz--viz-billboard-relative--no-color "+classNames[i]+ "--vz--viz-billboard-relative--decrease");
          const upArrows = downArrowsDiv[looper].getElementsByClassName(classNames[i]+ "--vz--viz-billboard-relative "+classNames[i]+ "--vz--viz-billboard-relative--no-color "+classNames[i]+ "--vz--viz-billboard-relative--increase");
          changeDownArrowColor(downArrows, divText);
          changeUpArrowColor(upArrows, divText);
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