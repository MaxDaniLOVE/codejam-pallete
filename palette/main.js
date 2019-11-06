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
            block.addEventListener('mousedown', () => {
                if (this.bucketActive) {
                    block.style.background = `${this.activeColor}`
                }
                if (this.transformActive) {
                    block.classList.toggle('block-rounded')
                }
                if (this.moveActive) {
                    this.dragAction(block)
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
            this.bucketBtn.classList.toggle('active-tool')
            this.chooseColorBtn.classList.remove('active-tool')
            this.moveBtn.classList.remove('active-tool')
            this.transformBtn.classList.remove('active-tool')

            this.bucketActive = true;
            this.chooseColorActive = false;
            this.moveActive = false;
            this.transformActive = false;
        })
        this.chooseColorBtn.addEventListener('click', () => {
            this.bucketBtn.classList.remove('active-tool')
            this.chooseColorBtn.classList.toggle('active-tool')
            this.moveBtn.classList.remove('active-tool')
            this.transformBtn.classList.remove('active-tool')

            this.bucketActive = false;
            this.chooseColorActive = true;
            this.moveActive = false;
            this.transformActive = false;
        })
        this.moveBtn.addEventListener('click', () => {
            this.bucketBtn.classList.remove('active-tool')
            this.chooseColorBtn.classList.remove('active-tool')
            this.moveBtn.classList.toggle('active-tool')
            this.transformBtn.classList.remove('active-tool')

            this.bucketActive = false;
            this.chooseColorActive = false;
            this.moveActive = true;
            this.transformActive = false;
        })
        this.transformBtn.addEventListener('click', () => {
            this.bucketBtn.classList.remove('active-tool')
            this.chooseColorBtn.classList.remove('active-tool')
            this.moveBtn.classList.remove('active-tool')
            this.transformBtn.classList.toggle('active-tool')

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
    dragAction(dragBlock){
        // ! --------------------- 
        // (1) отследить нажатие

        // (2) подготовить к перемещению:
        // разместить поверх остального содержимого и в абсолютных координатах
        dragBlock.style.position = 'absolute';
        dragBlock.style.zIndex = 1000;
        // переместим в body, чтобы мяч был точно не внутри position:relative
        document.body.append(dragBlock);
        // и установим абсолютно спозиционированный мяч под курсор

        moveAt(event.pageX, event.pageY);

        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(pageX, pageY) {
            dragBlock.style.left = pageX - dragBlock.offsetWidth / 2 + 'px';
            dragBlock.style.top = pageY - dragBlock.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // (3) перемещать по экрану
        document.addEventListener('mousemove', onMouseMove);

        // (4) положить мяч, удалить более ненужные обработчики событий
        dragBlock.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            dragBlock.onmouseup = null;
        };
    }
}

let canvas = new Canvas()
canvas.getBlocks()
canvas.changeColor()