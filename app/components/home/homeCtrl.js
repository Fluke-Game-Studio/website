angular.module('myAppHomeCtrl', []).controller('homeCtrl', ['$scope', 'homeContent', '$window', '$document', '$timeout', '$element', function($scope, homeContent, $window, $document, $timeout, $element){
	let last_x = 0;
    $window.scrollTo(0, 0);
    document.body.style.height = "100vh";

    // Reference to the bee element
    const bee = $document[0].getElementById('bug');
    const bubble = document.querySelector('.bubble'); 

    // Function to move the bee on mobile (touchmove event)
    $scope.moveBeeMobile = function(e) {
        const touch = e.touches[0];

        const bx = touch.clientX;
        const by = touch.clientY;

        bee.style.left = bx + 'px';
        bee.style.top = by + 'px';

        if (last_x < bx) {
            bee.classList.add('flip');
        } else {
            bee.classList.remove('flip');
        }
        last_x = bx;

        // Add honeycomb trail
        // const h = $document[0].createElement('div');
        // h.className = 'honey_trail';
        // h.style.left = bx + 10 + 'px';
        // h.style.top = by + 30 + 'px';

        // // Limit the spew of honeycomb
        // if (Math.random() < 0.5) {
        //     $document[0].body.appendChild(h);

        //     // Remove trail once faded
        //     setTimeout(() => {
        //         const honeyTrail = $document[0].getElementsByClassName('honey_trail')[0];
        //         if (honeyTrail) {
        //             honeyTrail.remove();
        //         }
        //     }, 2500);
        // }
    };

    var globalOffSetX;
    var globalOffSetY; 
    // Function to move the bee with the mouse (mousemove event)
    $scope.moveBeeMouse = function(e) {
        const x = e.clientX - 15;
        const y = e.clientY - 15;

        bee.style.left = x + 'px';
        bee.style.top = y + 'px';

        // bubble.style.left = x + -100 + 'px';
        // bubble.style.top = y + -100 + 'px' ;

        if (last_x < x) {
            bee.classList.add('flip');
        } else {
            bee.classList.remove('flip');
        }
        last_x = x;

        // Add honeycomb trail
        const h = $document[0].createElement('div');
        h.className = 'honey_trail';
        h.style.left = x + 10 + 'px';
        h.style.top = y + 30 + 'px';

        // Limit the spew of honeycomb
        if (Math.random() < 0.5) {
            $document[0].body.appendChild(h);

            // Remove trail once faded
            setTimeout(() => {
                const honeyTrail = $document[0].getElementsByClassName('honey_trail')[0];
                if (honeyTrail) {
                    honeyTrail.remove();
                }
            }, 2500);
        }
    };

    // Register event listeners
    $window.addEventListener('touchmove', $scope.moveBeeMobile);
    $window.addEventListener('mousemove', $scope.moveBeeMouse);

    // Function to update the bubble's position relative to the bee
    function updateBubblePosition() {
        
        const bee = document.querySelector('.bee');
        const beeRect = bee.getBoundingClientRect();
       
        const offsetX = (Math.random() - 0.5) * 250; 
        const offsetY = (Math.random() - 0.5) * 150; 
        
        const bubbleLeft = beeRect.left + beeRect.width / 2 + offsetX;
        const bubbleTop = beeRect.top + beeRect.height / 2 + offsetY;

        globalOffSetX = bubbleLeft;
        globalOffsetY = bubbleTop;

        bubble.style.left = bubbleLeft + 'px';
        bubble.style.top = bubbleTop + 'px';

        let directionClass = '';
        if (Math.abs(offsetX) > Math.abs(offsetY)) {
            
            if (offsetX > 0) {
                directionClass = 'right'; 
                directionClass = 'left'; 
            }
        } else {
            
            if (offsetY > 0) {
                directionClass = 'top'; 
            } else {
                directionClass = 'bottom'; 
            }
        }

        bubble.classList.remove('top', 'right', 'bottom', 'left');
        bubble.classList.add(directionClass);
    }

    function triggerRandomBubble() {
        setInterval(() => {
            const contentArray = homeContent.getContent();
            const randomContent = contentArray[Math.floor(Math.random() * contentArray.length)];
            $scope.content = `${randomContent.heading}: ${randomContent.text}`;
            
            updateBubblePosition(); 
            $scope.showBubble(); 
            
            $timeout($scope.hideBubble, 7000); // Hide after 1 second (adjust the time as needed)
        }, Math.random() * 9000 + 2000); 
    }

    // Start the random bubble trigger
    //triggerRandomBubble();

    $scope.showBubble = function () {
        bubble.classList.remove('hide');
        bubble.classList.add('show');
    };
    
    $scope.hideBubble = function () {
        console.log("hide");
        bubble.classList.remove('show');
        bubble.classList.add('hide');
    };

    $scope.content = homeContent.getContent();
}]);
