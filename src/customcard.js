export default function getCustomCardComponent(cardData){
    return `<p>${cardData.name}</p>
    <button class="board-button opacity-0 relative">
        <i class="card-options fa-solid fa-ellipsis"></i>
        <p data-card-id = "${cardData.id}" class="z-10 delete-card hidden">Archive</p>
    </button>`
}