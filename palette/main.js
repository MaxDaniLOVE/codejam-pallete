class Canvas {
    constructor(){
        this.bucketActive = false;
        this.chooseColorActive = false;
        this.moveActive = false;
        this.transformActive = false;
        // tools buttons
        this.bucketBtn = document.querySelector('.bucket');
        this.chooseColorBtn = document.querySelector('.choose-color');
        this.moveBtn = document.querySelector('.move');
        this.transformBtn = document.querySelector('.transform');
        // color buttons
        this.currentColorBtn = document.querySelector('.btn-current-color');
        this.prevColorBtn = document.querySelector('.btn-prev-color');
        this.firstColorBtn = document.querySelector('.btn-first-color');
        this.secondColorBtn = document.querySelector('.btn-second-color');
        // color spans
        this.activeSpan = document.querySelector('.current-color')
        this.prevSpan = document.querySelector('.prev-color')
        this.firstSpan = document.querySelector('.first-color')
        this.secondSpan = document.querySelector('.second-color')
        // active and previous colors 
        this.activeColor = window.getComputedStyle(this.activeSpan).backgroundColor
        this.prevColor = window.getComputedStyle(this.prevSpan).backgroundColor
    }
    getBlocks(){
        canvas.setTool()
        let blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.addEventListener('click', () => {
                if (this.bucketActive) {
                    block.style.background = `${this.activeColor}`
                }
                if (this.transformActive) {
                    block.classList.toggle('block-rounded')
                }
                if (this.chooseColorActive) {
                    this.prevColor = this.activeColor
                    this.prevSpan.style.backgroundColor = this.prevColor

                    this.activeColor = window.getComputedStyle(block).backgroundColor;
                    this.activeSpan.style.backgroundColor = this.activeColor
                }
                
            })
        });
    }
    setTool(){
        this.bucketBtn.addEventListener('click', () => {
            this.bucketActive = true;
            this.chooseColorActive = false;
            this.moveActive = false;
            this.transformActive = false;
        })
        this.chooseColorBtn.addEventListener('click', () => {
            this.bucketActive = false;
            this.chooseColorActive = true;
            this.moveActive = false;
            this.transformActive = false;
        })
        this.moveBtn.addEventListener('click', () => {
            this.bucketActive = false;
            this.chooseColorActive = false;
            this.moveActive = true;
            this.transformActive = false;
        })
        this.transformBtn.addEventListener('click', () => {
            this.bucketActive = false;
            this.chooseColorActive = false;
            this.moveActive = false;
            this.transformActive = true;
        })
    }
    changeColor(){
        let colorButtons = document.querySelectorAll('.btn-color')
        colorButtons.forEach(colorBtn => {
            colorBtn.addEventListener('click', () => {
                this.prevColor = this.activeColor
                this.prevSpan.style.backgroundColor = this.prevColor

                this.activeColor = window.getComputedStyle(colorBtn.firstChild).backgroundColor;
                this.activeSpan.style.backgroundColor = this.activeColor
            })
        });
        this.activeSpan.style.backgroundColor = `${this.activeColor}` 
    }
}

let canvas = new Canvas()
canvas.getBlocks()
canvas.changeColor()