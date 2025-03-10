AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y+1.6,
          z: pos.z-0.08,
        });

        

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //shooting sound
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    //Create paint splash
    var paint = document.createElement("a-entity");
    var pos = element.getAttribute("position")
    var rotate = elementHit.getAttribute("rotation")

    //set the position, rotation, scale
    paint.setAttribute("position", {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });
    paint.setAttribute("rotation", {
      x: rotate.x,
      y: rotate.y,
      z: rotate.z,
    });
    paint.setAttribute("scale", {
      x: 2,
      y: 2,
      z: 2,
    });

    //choose the paint splash image randomly
    var colorNum = parseInt(Math.random() * 8 + 1)

    paint.setAttribute("material", {
      opacity: 1,
      transparent: true,
      src: "./images/paint splash-0" + colorNum + ".png"
    });

    paint.setAttribute("geometry", {
      primitive: "plane",
      width: 0.5,
      height: 0.5
    });
    scene.appendChild(paint)

    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene      
    scene.removeChild(element);
  },
  shootSound: function () {
   
  },
});

