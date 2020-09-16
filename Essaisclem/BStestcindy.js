plateau.addEventListener('click',(event) => {
    document.getElementById('plateau');
    console.log(event.target);
    let x = event.target;
    x.classList.add('bateau');
    document.getElementById(x.id*1+1).classList.add('bateau');
});