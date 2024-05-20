export default function getCustomListComponent(listData){
    return `<div class="list-header">
    <p>${listData.name}</p><button><i class="fa-solid fa-ellipsis list-action-btn"></i>
</div>
<div class="list-actions-container hidden">
    <div class="list-actions-header-part">
        <p>List actions</p>
        <button><i class="close-list-action-btn fa-solid fa-xmark"></i></button>
    </div>
    <div class="list-actions">
        <button class="list-action delete-list-btn" data-list-id="${listData.id}">Archive this list</button>
    </div>

</div>
<ul class="cards-container" id="${listData.id}">
   

</ul>
<button class=" add-card-btn">+ Add a card</button>

<form data-list-id="${listData.id}" class="hidden create-card-container ">
<p class="text-xs text-red-600 hidden">Invalid CardName</p>
    <input name="card-name focus:outline-none" id="input-card-container"
        placeholder="Enter card title..." autocomplete="off" ></input>
    <button type="submit"  data-list-id="${listData.id}" class="text-black create-card-btn">Add
        card</button>
    <button class="ml-2"><i  class="close-create-card-btn fa-solid fa-xmark"></i></button>
</form>
`
}