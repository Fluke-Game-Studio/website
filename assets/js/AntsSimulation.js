var Hunters = [];
var Base;
var Food = [];
var Pharamones = [];
var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

document.body.onload = startGame();

function startGame() {
    Start();
    gameMake();
}

function Start() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
}

function Clear() {
    ctx.clearRect(0, 0, can.width, can.height);
}

var frameNo = 0;

function everyInt(n) {
    if (frameNo % n == 0) {
        return true;
    }
    return false;
}

function dis(x, y, x2, y2) {
    var xl = x2 - x;
    var yl = y2 - y;
    return Math.sqrt(xl ** 2 + yl ** 2);
}

function map(val, min, max, min2, max2) {
    var diff1 = max - min;
    var diff2 = max2 - min2;
    return diff2 / diff1 * val;
}

function randFrom(min, max, t) {
    if (t == 2) {
        return Math.random() * (max - min) + min;
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

function randBet(c1, c2) {
    var nArr = [c1, c2];
    return nArr[randFrom(0, 1)];
}

var m = new Vector(can.width / 2, can.height / 2);
var touch = false;
var slided = false;

can.onmousedown = function (event) {
    touch = true;
    m.x = event.clientX;
    m.y = event.clientY;
    for (var i = 0; i < 10; i++) {
        Food.push(new Vector(m.x + randFrom(-10, 10), m.y + randFrom(-10, 10)));
    }
};

can.onmousemove = function (event) {
    slided = true;
    m.x = event.clientX;
    m.y = event.clientY;
    if (touch) {
        for (var i = 0; i < 10; i++) {
            Food.push(new Vector(m.x + randFrom(-10, 10), m.y + randFrom(-10, 10)));
        }
    }
};

can.onmouseup = function () {
    touch = false;
    slided = false;
};

can.ontouchstart = function (event) {
    touch = true;
    m.x = event.touches[0].clientX;
    m.y = event.touches[0].clientY;
    Food.push({ x: m.x, y: m.y });
};

can.ontouchmove = function (event) {
    slided = true;
    m.x = event.touches[0].clientX;
    m.y = event.touches[0].clientY;
    for (var i = 0; i < 10; i++) {
        Food.push(new Vector(m.x + randFrom(-10, 10), m.y + randFrom(-10, 10)));
    }
};

can.ontouchend = function () {
    touch = false;
    slided = false;
};

function Stop() {
    clearInterval(Animate);
}

function Vector(x, y) {
    this.x = x;
    this.y = y;
    this.mag = dis(0, 0, this.x, this.y);
    this.dir = Math.atan2(this.y, this.x);
    
    this.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        this.mag = dis(0, 0, this.x, this.y);
        this.dir = Math.atan2(this.y, this.x);
    };
    
    this.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.mag = dis(0, 0, this.x, this.y);
        this.dir = Math.atan2(this.y, this.x);
    };
    
    this.mult = function (n) {
        this.x *= n;
        this.y *= n;
        this.mag = dis(0, 0, this.x, this.y);
        this.dir = Math.atan2(this.y, this.x);
    };
    
    this.div = function (n) {
        this.x /= n;
        this.y /= n;
        this.mag = dis(0, 0, this.x, this.y);
        this.dir = Math.atan2(this.y, this.x);
    };
    
    this.makeMag = function (m) {
        if (this.mag !== 0) {
            this.div(this.mag);
            this.mult(m);
        } else {
            return;
        }
        this.mag = dis(0, 0, this.x, this.y);
        this.dir = Math.atan2(this.y, this.x);
    };
    
    this.limit = function (l) {
        if (this.mag > l) {
            this.makeMag(l);
        } else {
            return;
        }
        this.mag = dis(0, 0, this.x, this.y);
        this.dir = Math.atan2(this.y, this.x);
    };
    
    this.connect = function (v) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();
    };
    
    this.get = function () {
        return new Vector(this.x, this.y);
    };
}

var PVector = {
    add: function (v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    },
    sub: function (v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    },
    rand2D: function () {
        var r = randFrom(0, 2 * Math.PI, 2);
        return new Vector(Math.cos(r), Math.sin(r));
    }
};

function P(x, y, r, type, rate) {
    this.x = x;
    this.y = y;
    this.a = 1;
    this.rate = rate;
    this.type = type;
    
    this.upd = function () {
        this.r = this.a / 1 * r;
        if (type == "home") {
            ctx.fillStyle = "rgb(127,127,255)";
        } else if (type == "food") {
            ctx.fillStyle = "rgb(255,127,127)";
        }
        ctx.beginPath();
        ctx.arc(x, y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        this.a -= this.rate;
    };
}

function Ants(x, y, r, h) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.h = h;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.maxSpeed = 5;
    this.maxForce = 1;
    this.wanderPow = 0.3;
    this.desired;
    this.sense = { rad: this.r * 200, v: Math.PI / 2 };
    this.sensorF = { x: undefined, y: undefined, rad: 20, value: 0 };
    this.sensorL = { x: undefined, y: undefined, rad: 20, value: 0 };
    this.sensorR = { x: undefined, y: undefined, rad: 20, value: 0 };
    this.gotten = false;
    this.target = null;

    this.applyForce = function (force) {
        var f = force.get();
        this.acc.add(f);
    };

    this.eat = function () {
        if (this.target == null && this.gotten == false) {
            if (Food.length > 0) {
                var f = Food[randFrom(0, Food.length - 1)];
                var p = new PVector.sub(f, this.pos);
                var pa = p.dir;
                if (Math.sqrt((this.an - pa) ** 2) <= this.sense.v / 2 && dis(f.x, f.y, this.pos.x, this.pos.y) <= this.sense.rad) {
                    this.target = f;
                    this.foodFound = f;
                }
            }
        }

        if (this.target !== null) {
            var s = new PVector.sub(this.target, this.pos);
            s.makeMag(this.maxSpeed);
            this.desired = s.dir;

            if (dis(this.target.x, this.target.y, this.pos.x, this.pos.y) < 15) {
                for (var i = 0; i < Food.length; i++) {
                    if (Food[i] == this.target) {
                        this.gotten = true;
                        this.vel.mult(-1);
                        Food.splice(i, 1);
                        break;
                    } else {
                        continue;
                    }
                }
                this.target = null;
            }
        }
    };

    this.follow = function () {
        var left = this.an - this.sense.v / 2;
        var forward = this.an;
        var right = this.an + this.sense.v / 2;

        this.updSensor = function (sensor) {
            var sp;
            if (sensor == this.sensorL) {
                sp = new Vector(Math.cos(left) * this.sense.rad, Math.sin(left) * this.sense.rad);
            } else if (sensor == this.sensorR) {
                sp = new Vector(Math.cos(right) * this.sense.rad, Math.sin(right) * this.sense.rad);
            } else if (sensor == this.sensorF) {
                sp = new Vector(Math.cos(forward) * this.sense.rad, Math.sin(forward) * this.sense.rad);
            }
            sensor.x = this.pos.x + sp.x;
            sensor.y = this.pos.y + sp.y;
            sensor.value = 0;

            var spec = [];
            for (var i = 0; i < Pharamones.length; i++) {
                if (dis(Pharamones[i].x, Pharamones[i].y, sensor.x, sensor.y) < sensor.rad) {
                    if (this.gotten == false && Pharamones[i].type == "food") {
                        spec.push(Pharamones[i]);
                    }
                    if (this.gotten == true && Pharamones[i].type == "home") {
                        spec.push(Pharamones[i]);
                    }
                } else {
                    continue;
                }
            }
            for (var i = 0; i < spec.length; i++) {
                sensor.value += spec[i].a;
            }
        };

        this.updSensor(this.sensorF);
        this.updSensor(this.sensorL);
        this.updSensor(this.sensorR);

        if (this.sensorF.value > Math.max(this.sensorL.value, this.sensorR.value)) {
            this.desired = forward;
        } else if (this.sensorL.value > this.sensorR.value) {
            this.desired = left;
        } else if (this.sensorR.value > this.sensorL.value) {
            this.desired = right;
        }
    };

    this.upd = function () {
        this.an = this.vel.dir;
        ctx.fillStyle = "hsl(" + this.h + ",100%,50%)";
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.an + Math.PI / 2);
        ctx.fillRect(-this.r, -this.r * 3, this.r * 2, this.r * 6);
        ctx.restore();

        if (dis(this.pos.x, this.pos.y, Base.x, Base.y) < 60) {
            this.gotten == false;
        }

        var r = randFrom(-this.wanderPow, this.wanderPow, 2);
        this.desired = this.an + r;
        this.follow();
        this.eat();

        if (this.pos.x >= can.width) {
            var d = randFrom(Math.PI / 2, 3 * Math.PI / 2, 2);
            this.vel = new Vector(Math.cos(d) * this.maxSpeed, Math.sin(d) * this.maxSpeed);
        }
        if (this.pos.x <= 0) {
            var d = randFrom(-Math.PI / 2, Math.PI / 2, 2);
            this.vel = new Vector(Math.cos(d) * this.maxSpeed, Math.sin(d) * this.maxSpeed);
        }
        if (this.pos.y >= can.height) {
            var d = randFrom(-Math.PI, 0, 2);
            this.vel = new Vector(Math.cos(d) * this.maxSpeed, Math.sin(d) * this.maxSpeed);
        }
        if (this.pos.y <= 0) {
            var d = randFrom(0, Math.PI, 2);
            this.vel = new Vector(Math.cos(d) * this.maxSpeed, Math.sin(d) * this.maxSpeed);
        }

        if (this.gotten == true && dis(this.pos.x, this.pos.y, Base.x, Base.y) < this.sense.rad + 30) {
            this.desired = Math.atan2(Base.y - this.pos.y, Base.x - this.pos.x);
        }

        if (dis(this.pos.x, this.pos.y, Base.x, Base.y) < 30 && this.gotten == true) {
            this.gotten = false;
            this.vel.mult(-1);
        }

        var desV = new Vector(Math.cos(this.desired), Math.sin(this.desired));
        desV.makeMag(this.maxSpeed);
        var steer = new PVector.sub(desV, this.vel);
        steer.limit(this.maxForce);
        this.acc = steer;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    };
}

function gameMake() {
    var No = 70;
    var rad = 0.8;
    Base = { x: can.width / 2, y: can.height / 2 };
    for (var i = 0; i < No; i++) {
        Hunters.push(new Ants(Base.x, Base.y, rad, randBet(30, 60)));
        Hunters[i].vel = new Vector(Math.cos(Math.PI * 2 / No * i) * 10, Math.sin(Math.PI * 2 / No * i) * 10);
        Hunters[i].desired = Math.PI * 2 / No * i;
    }
    for (var i = 0; i < 200; i++) {
        var c = { x: can.width / 6, y: 5 * can.height / 6 };
        var d = { x: 5 * can.width / 6, y: 5 * can.height / 6 };
        var x = randFrom(-20, 20);
        var y = randFrom(-20, 20);
        Food.push(new Vector(c.x + x, c.y + y));
        Food.push(new Vector(d.x + x, d.y + y));
    }
}

function gameMove() {
    requestAnimationFrame(gameMove);
    Clear();
    frameNo++;

    if (everyInt(7)) {
        for (var i = 0; i < Hunters.length; i++) {
            if (Hunters[i].gotten == false) {
                var t = "home";
                var rate = 0.006;
            } else {
                var t = "food";
                var rate = 0.01;
            }
            Pharamones.push(new P(Hunters[i].pos.x, Hunters[i].pos.y, 1, t, rate));
        }
    }

    for (var i = 0; i < Pharamones.length; i++) {
        if (Pharamones[i].a > 0) {
            Pharamones[i].upd();
        } else {
            Pharamones.splice(i, 1);
        }
    }

    for (var i = 0; i < Hunters.length; i++) {
        Hunters[i].upd();
    }

    for (var i = 0; i < Food.length; i++) {
        ctx.fillStyle = "lime";
        ctx.beginPath();
        ctx.arc(Food[i].x, Food[i].y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.fillStyle = "rgb(63,31,0)";
    ctx.beginPath();
    ctx.arc(Base.x, Base.y, 30, 0, 2 * Math.PI);
    ctx.fill();
}

gameMove();
