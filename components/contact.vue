<template>
    <div>
        <div class="container my-5 py-5">
            
            <div class="f66 fpoppins text-white fw600 text-center mb-5">
                 
                <span class="text-white">Feel free to </span> <span class="fred">contact me!</span>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <img src="/assets/img/imgcontact.png" class="w-100 mb-4 d-block mx-auto rounded-3">
                    <nuxt-link class="btn btn_contact w-100 text-white" to="/contact">@arvanofsky</nuxt-link>
                </div>
                <div class="col-md-4 mb-3">
                    <img src="/assets/img/imgcontact.png" class="w-100 mb-4 d-block mx-auto  rounded-3">
                    <nuxt-link class="btn btn_contact w-100 text-white" to="/contact">@arvanofsky</nuxt-link>
                </div>
                <div class="col-md-4 mb-3">
                    <img src="/assets/img/imgcontact.png" class="w-100 mb-4 d-block mx-auto  rounded-3">
                    <nuxt-link class="btn btn_contact w-100 text-white" to="/contact">info@arfan.com</nuxt-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
 export default {
    name:'contact'
 }
</script>