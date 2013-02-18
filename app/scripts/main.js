(function() {
   'use strict';

    function handleDragStart (e) {
        this.style.opacity = '.4';
        console.log(e);
    }

    function handleDragEnter(e) {
        console.log('handleDragEnter');
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragOver(e) {
        console.log('handleDragOver');
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
    }

    function handleDragLeave(e) {
        console.log('handleDragLeave');
        this.classList.remove('over');  // this / e.target is previous target element.
    }

    var items = document.querySelectorAll('li');

    [].forEach.call(items, function(el) {
        el.addEventListener('dragstart', handleDragStart, false);
        el.addEventListener('dragenter', handleDragEnter, false);
        el.addEventListener('dragover', handleDragOver, false);
        el.addEventListener('dragleave', handleDragLeave, false);
    });
})();
