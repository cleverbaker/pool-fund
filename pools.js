// A pool fills up with water and then overflows to pools below it on each side.
// Each pool has a capacity and a current amount of water. The capacity is the
// maximum amount of water that the pool can hold. The current amount of water
// is the amount of water that the pool currently contains. The pool will
// overflow if the current amount of water is greater than the capacity. When
// the pool overflows, the excess water will be evenly distributed to the pools
// below it on each side. If a pool overflows to a pool that is already full,
// the excess water will continue to overflow to the next pool. If the pool
// overflows to both pools below it, the water will be evenly distributed to
// both pools. If the pool overflows to only one pool, all of the excess water
// will overflow to that pool. If the pool does not overflow, the water will
// remain in the pool. The pools are represented by an array of integers where
// each integer represents the capacity of the pool at that index. The current
// amount of water in each pool is represented by the value of the integer at
// that index. Write a function that takes in an array of integers and returns
// the final amount of water in each pool after the water has been evenly
// distributed. The function should return an array of integers where each
// integer represents the final amount of water in the pool at that index. If a
// pool does not overflow, the final amount of water in that pool will be the
// same as the current amount of water. If a pool does overflow, the final
// amount of water in that pool will be the capacity of the pool. The function
// should return an array of integers where each integer represents the final
// amount of water in the pool at that index. The function should return an
// array of integers where each integer represents the final amount of water in
// the pool at that index.
// The amount of water in each pool is represented by the Area of the pool

// Time: O(n)
// Space: O(n)

// create the Pool object
class Pool {
    constructor(capacity) {
        this.capacity = capacity;
        this.current = 0;
        this.overflow = 0;

        // create dimensions for the pool, default ratio of 3:2 for width:height, where Area represents the capacity
        this.width = Math.sqrt(capacity * 3 / 2);
        this.height = Math.sqrt(capacity * 2 / 3);

        this.x = 200;
        this.y = 200;

        // create the pool div with 10px outline
        this.div = document.createElement("div");
        this.div.classList.add("pool");
        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;
        this.div.style.border = "10px solid #333";
        this.div.style.position = "absolute";
        this.div.id = "pool" + randomId();
        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";

        // add the pool div to the body of the document
        document.body.appendChild(this.div);

        // create the span element to be equal to amount of water in the pool
        this.span = document.createElement("span");
        this.span.style.display = "block";
        this.span.style.position = "absolute";
        this.span.style.height = "0";
        this.span.style.width = this.width + "px";
        this.span.style.bottom = "0";
        this.span.style.backgroundColor = "lightblue";
        this.span.id = "amnt-filled-" + randomId();
        this.div.appendChild(this.span);

        // create the right side overflow div with 10px width
        this.right = document.createElement("div");
        this.right.style.width = "10px";
        this.right.style.height = "0";
        this.right.style.position = "absolute";
        this.right.style.right = "-10px";
        this.right.style.top = "-10px";
        this.right.style.backgroundColor = "lightblue";
        this.right.classList.add("overflow");
        this.right.style.id = "right-overflow-" + randomId();
        this.div.appendChild(this.right);

        // create the left side overflow div with 10px width
        this.left = document.createElement("div");
        this.left.style.width = "10px";
        this.left.style.height = "0";
        this.left.style.position = "absolute";
        this.left.style.left = "-10px";
        this.left.style.top = "0";
        this.left.style.backgroundColor = "lightblue";
        this.left.classList.add("overflow");
        this.left.style.id = "left-overflow-" + randomId();
        this.div.appendChild(this.left);

        const card = document.createElement("div");
        card.classList.add("card0");
        card.id = "card-" + randomId();
        card.style.position = "absolute";
        card.style.width = "200px";
        card.style.height = "200px";
        card.style.backgroundColor = "white";
        card.style.border = "1px solid #333";
        card.style.top = this.y + "px";
        card.style.left = this.x + this.width + 26 + "px";
        card.style.zIndex = "1000";
        card.style.display = "none";


        // add the card to the body of the document
        document.body.appendChild(card);

        // if the body is clicked, the card disappears
        /*           document.addEventListener("click", (e) => {
                       if (e.target !== card) {
                           card.remove();
                       }
                   });*/

        const h1 = document.createElement("h1");
        h1.textContent = "Pool Settings";
        card.appendChild(h1);

        const capacity_btn = document.createElement("button");
        capacity.textContent = "Change Capacity";
        capacity.addEventListener("click", () => {
            this.capacity = prompt("Enter new capacity:");
            this.width = Math.sqrt(this.capacity * 3 / 2);
            this.height = Math.sqrt(this.capacity * 2 / 3);
            this.div.style.width = `${this.width}px`;
            this.div.style.height = `${this.height}px`;
        });
        card.appendChild(capacity_btn);

        const addWater = document.createElement("button");
        addWater.textContent = "Add Water";
        addWater.addEventListener("click", () => {
            this.current += 10;

            // if the pool overflows, the excess water will be evenly distributed to the pools below it on each side
            if (this.current > this.height) {
                this.overflow = this.capacity - this.current/this.width;
                this.current = this.capacity;
                this.span.style.height = this.current + "px";
                this.right.style.height = this.overflow / 2 + "px";
                this.left.style.height = this.overflow / 2 + "px";

                // change transition time to be equal to overflow height in milliseconds
                this.right.style.transition = this.overflow / 2 + "ms";
                this.left.style.transition = this.overflow / 2 + "ms";
            } else {
                this.span.style.height = this.current + "px";
            }
        });
        card.appendChild(addWater);

        const dimensions = document.createElement("button");
        dimensions.textContent = "Change Dimensions";
        dimensions.addEventListener("click", () => {
            // corners of the pool div are draggable to change the dimensions of the pool while maintaining the
            // same capacity, same total Area
            const corners = document.createElement("div");
            corners.style.width = "10px";
            corners.style.height = "10px";
            corners.style.position = "absolute";
            corners.style.bottom = "0";
            corners.style.right = "0";
            corners.style.backgroundColor = "red";
            corners.style.cursor = "resize";
            corners.style.zIndex = "1000";
            corners.addEventListener("mousedown", (e) => {
                const x = e.clientX;
                const y = e.clientY;
                const width = this.div.getBoundingClientRect().width;
                const height = this.div.getBoundingClientRect().height;
                document.addEventListener("mousemove", (e) => {
                    this.width = width + e.clientX - x;
                    this.height = height + e.clientY - y;
                    this.div.style.width = this.width + "px";
                    this.div.style.height = this.height + "px";
                });
                document.addEventListener("mouseup", () => {
                    document.removeEventListener("mousemove", () => {
                    });
                });
            });
            card.appendChild(corners);

            // if click elsewhere, besides the corners, the corners disappear
            /*                document.addEventListener("click", (e) => {
                                if (e.target !== corners) {
                                    corners.remove();
                                }
                            });*/
            card.appendChild(dimensions);
        });

        //document.body.appendChild(card);

/*
        // the pool can be clicked and dragged and moved around the screen with the mouse to the position where the
        // cursor does mouse up
        this.div.addEventListener("mousedown", (e) => {
            e.preventDefault();
            const x = e.clientX;
            const y = e.clientY;
            const rect = this.div.getBoundingClientRect();
            this.x = rect.x;
            this.y = rect.y;
            document.addEventListener("mousemove", (e) => {
                this.div.style.left = this.x + e.clientX - x + "px";
                this.div.style.top = this.y + e.clientY - y + "px";
                this.div.classList.add("dragging");
            });
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", () => {
                    this.div.classList.remove("dragging");
                });
                // set the new x and y coordinates to the current position of the pool div
                this.x = parseInt(this.div.style.left);
                this.y = parseInt(this.div.style.top);
            });
/!*
            document.addEventListener("click", (e) => {
                    document.removeEventListener("mousemove", () => {});

                })*!/
            });*/


        // when the pool is clicked, a console card appears with the pool's id and the amount of water in the pool
        // and 3 settings buttons to change the pool's capacity, add water to the pool, and change the pool's dimensions
        this.div.addEventListener("click", () => {
            // console.log("Pool ID: " + this.div.id + " Amount of Water: " + this.span.style.height);
            card.style.display = "block"
          });

        // when the card is double clicked, the card disappears
        card.addEventListener("dblclick", () => {
            card.style.display = "none";
        });
    }
}

// create pool button
const createPool = document.createElement("button");
createPool.textContent = "+ Create Pool";

// styling for the create pool button
createPool.style.border = "1px solid #333";
createPool.style.backgroundColor = "white";

// when the create pool button is clicked, the user is prompted to enter the pool's capacity and a new pool is created
createPool.addEventListener("click", () => {
    const capacity = prompt("Enter pool capacity:");
    const pool = new Pool(capacity);
    document.body.appendChild(pool.div);
});

// add the create pool button to the body of the document
document.body.appendChild(createPool);



// create random 4 character alphanumeric id
function randomId() {
    return Math.random().toString(36).slice(2, 6);
}

function pools(array) {
  const result = new Array(array.length).fill(0);
  for (let i = 0; i < array.length; i++) {
    let water = array[i];
    let left = i - 1;
    let right = i + 1;
    while (water > array[i] && (left >= 0 || right < array.length)) {
      if (left >= 0) {
        result[left] += 1;
        water -= 1;
        left -= 1;
      }
      if (right < array.length) {
        result[right] += 1;
        water -= 1;
        right += 1;
      }
    }
  }
  return result;
}

console.log(pools([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]

// create styles for the pool divs

