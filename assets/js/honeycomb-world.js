class World {
  constructor(canvasId) {
      // Initialize the world (hexagons, grid, etc.)
      this.canvasId = canvasId;
      this.options = {
        hexHeight: 98,
        hexGlowRadius: 300,
        hexFillColor: 'rgba(18, 18, 18, 0.9)',
        glowColorStart: 'rgba(252, 181, 3, 1)',
        glowColorEnd: 'rgba(252, 181, 3, 0)',
        glowSpeed: 0.1,
        hexRepelRadius: 200,
        hexRepelStrength: 50,
      };
      this.hexagons = this.initializeHexagonCanvas('canvas',this.options);
  }

  initializeHexagonCanvas(canvasId, options = {}) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      // const updateCanvasSize = () => {
      //   const rect = canvas.getBoundingClientRect();
      //   canvas.width = rect.width;
      //   canvas.height = rect.height;
      //   console.log(canvas.getBoundingClientRect());
      // };
      let scaleFactor = 1;

      // Removed rect dependency for manual scaling
      const updateCanvasSize = () => {
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width * scaleFactor;
          canvas.height = rect.height * scaleFactor;
      };
      updateCanvasSize();

      const config = {
        hexHeight: 98,
        hexGlowRadius: 150,
        hexFillColor: '#333',
        glowColorStart: 'rgba(255, 255, 0, 0.8)',
        glowColorEnd: 'rgba(255, 255, 0, 0)',
        glowSpeed: 0.1,
        hexRepelRadius: 200,
        hexRepelStrength: 40,
        ...options,
      };

      const hexWidth = config.hexHeight * Math.sqrt(3);
      const hexHorizDist = hexWidth * 0.5067 + 12;
      const hexVertDist = config.hexHeight * 0.755 + 12;
      const hexRadius = config.hexHeight / 2;

      let cursorPosition = { x: canvas.width / 2, y: canvas.height / 2 };
      let targetCursorPosition = { ...cursorPosition };
      const hexagons = []; // Array to store hexagon data
      
      function drawHexagon(x, y, index) {
          const hex = hexagons[index];
          if (!hex) {
              console.warn(`Hexagon data missing for index: ${index}`);
              return;
          }

          const scaleX = hex.flipping ? Math.cos((Math.PI * hex.progress) / 100) : 1;
          const scaleY = hex.flipping ? (Math.sin((Math.PI * hex.progress) / 100) + 1) / 2 : 1; // Magnify/demagnify effect

          ctx.save();
          ctx.translate(x, y);
          ctx.scale(scaleX, scaleY); // Horizontal flip scaling and vertical scaling
          ctx.beginPath();

          for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i - Math.PI / 6;
              const xOffset = hexRadius * Math.cos(angle);
              const yOffset = (config.hexHeight / 2) * Math.sin(angle);
              if (i === 0) ctx.moveTo(xOffset, yOffset);
              else ctx.lineTo(xOffset, yOffset);
          }
          ctx.closePath();

          // Apply glow effect if hexagon is hovered
          if (hex.hovered) {
              const gradient = ctx.createLinearGradient(0, 0, hexRadius, 0);
              gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 6; // Increased stroke width for visual weight
              ctx.stroke();
          }

          ctx.fillStyle = hex.isFront ? config.hexFillColor : 'rgba(252, 181, 3, 0.8)'; // Slightly darker yellow for back
          ctx.fill();

          
          // Draw hexagon label to show "front" or "back"
          ctx.fillStyle = 'white';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(hex.isFront ? '' : hex.displayBackText, 0, 0);

          ctx.restore();

          // Update flip progress and toggle state when complete
          if (hex.flipping) {
              hex.progress += 5; // Adjust speed of animation
              if (hex.progress >= 100) {
                  hex.flipping = false; // End flipping animation
                  hex.progress = 0; // Reset progress
                  hex.isFront = !hex.isFront; // Toggle state
              }
          }
      }

      function drawGlow() {
        const gradient = ctx.createRadialGradient(
          cursorPosition.x,
          cursorPosition.y,
          0,
          cursorPosition.x,
          cursorPosition.y,
          config.hexGlowRadius
        );
        gradient.addColorStop(0, config.glowColorStart);
        gradient.addColorStop(1, config.glowColorEnd);

        ctx.globalCompositeOperation = 'destination-over';
        ctx.beginPath();
        ctx.arc(cursorPosition.x, cursorPosition.y, config.hexGlowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGlow();

        const rows = Math.ceil(canvas.height / hexVertDist);
        const cols = Math.ceil(canvas.width / hexHorizDist) + 1;

        const gridWidth = (cols - 1) * hexHorizDist + hexWidth;
        const gridHeight = (rows - 1) * hexVertDist + config.hexHeight;

        const xOffsetStart = (canvas.width - gridWidth) / 2 + hexWidth / 2;
        const yOffsetStart = (canvas.height - gridHeight) / 2 + config.hexHeight / 2;

        let hexIndex = 0;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const baseX = xOffsetStart + col * hexHorizDist + (row % 2 === 0 ? 0 : hexHorizDist / 2);
            const baseY = yOffsetStart + row * hexVertDist;

            const dx = baseX - cursorPosition.x;
            const dy = baseY - cursorPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const repelFactor = Math.max(0, (config.hexRepelRadius - distance) / config.hexRepelRadius);
            const offsetX = dx * repelFactor * config.hexRepelStrength / config.hexRepelRadius;
            const offsetY = dy * repelFactor * config.hexRepelStrength / config.hexRepelRadius;

            // Check if hexagon already exists
            let hex = hexagons[hexIndex];
            if (!hex) {
              hex = {
                x: baseX,
                y: baseY,
                radius: hexRadius,
                index: hexIndex,
                flipping: false,
                progress: 0,
                isFront: true,
                displayBackText: hexIndex
              };
              hexagons[hexIndex] = hex;
            } else {
              hex.x = baseX;
              hex.y = baseY;
            }

            drawHexagon(baseX + offsetX, baseY + offsetY, hexIndex++);
          }
        }

    // Trim excess hexagons if grid size decreases
    hexagons.length = hexIndex;
    return hexagons
    }


    function animateCursor() {
      drawGrid();
      cursorPosition.x += (targetCursorPosition.x - cursorPosition.x) * config.glowSpeed;
      cursorPosition.y += (targetCursorPosition.y - cursorPosition.y) * config.glowSpeed;
      requestAnimationFrame(animateCursor);
    }

    function detectClickedHexagon(x, y) {
      for (const hexagon of hexagons) {
        const dx = x - hexagon.x;
        const dy = y - hexagon.y;
        if (Math.sqrt(dx * dx + dy * dy) <= hexagon.radius) {
          return hexagon.index; // Return the index of the clicked hexagon
        }
      }
      return null;
    }

    canvas.addEventListener('click', (e) => {
     
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * scaleFactor;
      const clickY = (e.clientY - rect.top) * scaleFactor;

      const clickedHexIndex = detectClickedHexagon(clickX, clickY);
      // if (clickedHexIndex !== null && hexagons[clickedHexIndex]) {
      //     const clickedHex = hexagons[clickedHexIndex];

      //     // Validate and move the player to the clicked hexagon
      //     if (player.validateMove(clickedHex)) {
      //         player.moveToHexagon(clickedHex);
      //     } else {
      //         console.warn('Invalid move!'); // Handle invalid moves
      //     }

      //     // Optional: Start hex flip animation if needed
            hexagons[clickedHexIndex].flipping = true;
      // }
    });


    window.addEventListener('mousemove', (e) => {
       // Use getBoundingClientRect() to get canvas position relative to the viewport
      const rect = canvas.getBoundingClientRect();
      console.log(" ==> " + rect.width,rect.height);
      
      targetCursorPosition.x = (e.clientX - rect.left) * scaleFactor ;
      targetCursorPosition.y = (e.clientY - rect.top) * scaleFactor;
      
      hexagons.forEach(hex => {
      const dx = targetCursorPosition.x - hex.x;
      const dy = targetCursorPosition.y - hex.y;
      hex.hovered = Math.sqrt(dx * dx + dy * dy) <= hex.radius;
      });
    });

    window.addEventListener('resize', () => {
      updateCanvasSize();
      //drawGrid();
    });

    const onScroll = (event) => {
        if (event.deltaY < 0) {
            // Scroll up: increase the scale factor
            scaleFactor += 0.05; // You can adjust the increment value
        } else if (event.deltaY > 0) {
            // Scroll down: decrease the scale factor
            scaleFactor = Math.max(0.1, scaleFactor - 0.05); // Prevent scale factor from going too small
        }

        updateCanvasSize();
        drawGrid();
    };

    window.addEventListener('wheel', onScroll);

    animateCursor();

    return hexagons;
  }
}