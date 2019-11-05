class Canvas {
    constructor(){
        this.bucketActive = false;
        this.chooseColorActive = false;
        this.moveActive = false;
        this.transformActive = false;

        this.bucketBtn = document.querySelector('.bucket');
        this.chooseColorBtn = document.querySelector('.choose-color');
        this.moveBtn = document.querySelector('.move');
        this.transformBtn = document.querySelector('.transform');
    }
    getBlocks(){
        let blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.addEventListener('click', () => {
                if (this.bucketActive) {
                    block.style.background = 'red'
                }
                if (this.transformActive) {
                    block.classList.toggle('block-rounded')
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
}

let canvas = new Canvas()
canvas.getBlocks()
canvas.setTool()
console.log(canvas.transformActive);
