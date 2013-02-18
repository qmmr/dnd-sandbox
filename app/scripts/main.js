(function() {
   'use strict';

    function handleDragStart (e) {
        // this.style.opacity = '.4';
        this.classList.add('moving');
        // console.log(e);

        // sets dataObject as this el's innerHTML
        dragSrcEl = this.parentNode;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.parentNode.innerHTML);
    }

    function handleDragEnter(e) {
        console.log('handleDragEnter');
        // this / e.target is the current hover target.
        // this.classList.add('over');
    }

    function handleDragOver(e) {
        // console.log('handleDragOver');
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

    function handleCancel(e) {
        var li = this.parentNode;
        var clone = li.cloneNode(true);

        // console.log(clone, items);
        items.appendChild(clone);
        li.parentNode.removeChild(li);
    }

    function handleDrop(e) {
        // this / e.target is current target element.
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        // [].forEach.call(items, function (el) {
        //     el.classList.remove('moving');
        // });

        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            // dragSrcEl.innerHTML = this.innerHTML;
            // this.innerHTML = e.dataTransfer.getData('text/html');

            var li = document.createElement('li');
            var span = document.createElement('span');
            // console.log(e.dataTransfer.getData('text/html'));
            li.innerHTML = e.dataTransfer.getData('text/html');
            span.textContent = 'x';
            span.addEventListener('click', handleCancel, false);

            li.appendChild(span);
            cart.appendChild(li);
            dragSrcEl.parentNode.removeChild(dragSrcEl);
        }

        this.classList.remove('over');
        console.log('handleDrop');

        return false;
    }

    function handleDragEnd(e) {
        // this/e.target is the source node.
        [].forEach.call(items, function (el) {
            el.classList.remove('over');
        });
        // console.log('handleDragEnd');
    }

    var dragSrcEl = null; // placeholder for html of dragged element

    var dropzone = document.querySelector('#dropzone');
    dropzone.addEventListener('drop', handleDrop, false);
    dropzone.addEventListener('dragenter', handleDragEnter, false);
    dropzone.addEventListener('dragover', handleDragOver, false);

    var cart = document.getElementById('cart');
    var items = document.getElementById('items');

    var links = document.querySelectorAll('#items > li > a');
    [].forEach.call(links, function(el) {
        el.addEventListener('dragstart', handleDragStart, false);
        el.addEventListener('dragenter', handleDragEnter, false);
        el.addEventListener('dragover', handleDragOver, false);
        el.addEventListener('dragleave', handleDragLeave, false);
        el.addEventListener('drop', handleDrop, false);
        el.addEventListener('dragend', handleDragEnd, false);
    });
})();
