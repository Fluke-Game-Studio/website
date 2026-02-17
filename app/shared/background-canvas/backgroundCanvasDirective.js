angular.module('myAppBackgroundCanvasDirective', [])
.directive('backgroundCanvasDir', [function() {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/background-canvas/background-canvas.html',
        link: function(scope, element, attrs) {
            const canvas = element.find('canvas')[0];
            const ctx = canvas.getContext('2d');
            let cw, ch, cx, cy;

            function init() {
                cw = canvas.width = window.innerWidth;
                ch = canvas.height = window.innerHeight;
                cx = cw / 2;
                cy = ch / 2;
            }

            init();
            window.addEventListener('resize', init);

            const cfg = {
                bgFillColor: 'rgba(50,50,50,.01)',
                dirsCount: 6,          // hex grid
                stepsToTurn: 15,       // 🔽 decrease = tighter turning
                dotSize: 2,            // 🔽 smaller dot
                dotCount: 250,         // 🔽 fewer dots for clarity
                dotVelocity: 2,        // 🔽 slower speed = tighter patterns
                distance: 40,          // 🔽 lower = shorter life = tighter trails
              };

            function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco) {
                ctx.globalCompositeOperation = gco || 'source-over';
                ctx.shadowColor = shadowColor || 'black';
                ctx.shadowBlur = shadowBlur || 0;
                ctx.fillStyle = color;
                ctx.fillRect(x, y, w, h);
            }

            class Dot {
                constructor() {
                    this.pos = { x: cx, y: cy };
                    this.dir = (Math.random() * 3 | 0) * 2;
                    this.step = 0;
                }

                redrawDot() {
                    let color = '#f9c74f';
                    let size = cfg.dotSize;
                    let x = this.pos.x - size / 2;
                    let y = this.pos.y - size / 2;
                    drawRect(color, x, y, size, size, color, 0);
                }

                moveDot() {
                    this.step++;
                    this.pos.x += dirList[this.dir].x * cfg.dotVelocity;
                    this.pos.y += dirList[this.dir].y * cfg.dotVelocity;
                }

                changeDir() {
                    if (this.step % cfg.stepsToTurn === 0) {
                        this.dir = Math.random() > 0.5
                            ? (this.dir + 1) % cfg.dirsCount
                            : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount;
                    }
                }

                killDot(id) {
                    let percent = Math.exp(this.step / cfg.distance) * Math.random();
                    if (percent > 100) {
                        dotList.splice(id, 1);
                    }
                }
            }

            const dirList = [];
            for (let i = 0; i < 360; i += 360 / cfg.dirsCount) {
                dirList.push({ x: Math.cos(i * Math.PI / 180), y: Math.sin(i * Math.PI / 180) });
            }

            const dotList = [];

            function addDot() {
                if (dotList.length < cfg.dotCount && Math.random() > 0.8) {
                    dotList.push(new Dot());
                }
            }

            function refreshDots() {
                dotList.forEach((dot, id) => {
                    dot.moveDot();
                    dot.redrawDot();
                    dot.changeDir();
                    dot.killDot(id);
                });
            }

            function loop() {
                drawRect(cfg.bgFillColor, 0, 0, cw, ch, 0, 0);
                addDot();
                refreshDots();
                requestAnimationFrame(loop);
            }

            loop();

            scope.$on('$destroy', function() {
                window.removeEventListener('resize', init);
            });
        }
    };
}]);
