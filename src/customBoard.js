export default function CustomBoard(boardData){
    return `<p class="max-w-28 text-ellipsis overflow-hidden">
    ${boardData.name}</p>
<div class="grid place-items-center relative ">
    <i class="board-button opacity-0 fa-solid fa-ellipsis"></i>
    <div class="hidden z-10 w-max text-white bg-asideColor px-2  absolute  top-[100%] left-0">
        <div class=" p-3 flex gap-4 items-center  border-b border-gray-500">
            <p class="" >${boardData.name}</p>
            <i class="fa-solid fa-xmark close"></i>
        </div>

        <button data-board-id="${boardData.id}" class="delete-board w-full py-2">Close</button>
    </div>
</div>`
}