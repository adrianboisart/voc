'use strict';

app.controller("mainController", function ($scope, wordsService) {

    $scope.screenNo = 1;
    $scope.nbSkip = 0;
    $scope.nbTake = 20;
    $scope.inverseTest = false;


    var getNextWord = function () {
        $scope.nbWordsNow = wordsService.nbOfWordsToTest();
        $scope.currentWord = wordsService.getNextWord($scope.currentWord);

        if ($scope.currentWord) {
            $scope.question = $scope.inverseTest ? $scope.currentWord.sp : $scope.currentWord.tr;
            $scope.answer = $scope.inverseTest ? $scope.currentWord.tr : $scope.currentWord.sp;
        } else {
            $scope.question = '';
            $scope.answer = '';
        }

        $scope.hideTranslation = true;
        $scope.solutionWord = '';
    }

    $scope.startTest = function (nbSkip, nbTake) {
        wordsService.initLastWordList(nbSkip, nbTake);
        $scope.nbWordsInitial = wordsService.nbOfWordsToTest();
        getNextWord();
        $scope.screenNo = 2;
    }

    $scope.continueTest = function () {
        if ($scope.nbWordsNow && $scope.nbWordsNow > 0) $scope.screenNo = 2;
    }

    $scope.nextInTest = function () {
        getNextWord();
    }

    $scope.dontAskAgain = function () {
        wordsService.excludeWord($scope.currentWord);
        getNextWord();
    }

    $scope.undo = function () {
        wordsService.undo();
        getNextWord();
    }

});


