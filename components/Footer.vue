<template>
    <div class="footer">
        <footer>
            <div class="container">
                <div class="text-center mb-5">
                    <i class="fab fa-behance me-3 footer_sosmed"></i>
                    <i class="fab fa-linkedin-in me-3 footer_sosmed"></i>
                    <i class="fab fa-instagram footer_sosmed"></i>
                </div>
                <div class="text-center mb-1 f17 fpoppins">
                    Made in Jogjakarta
                </div>
                <div class="text-center finter f14">
                    © 2022 - {{ new Date().getFullYear() }}
                </div>
            </div>
            <img src="assets/img/footerarfan.svg" class="w-100">
        </footer>
    </div>
</template>

<script>

export default {
  name: 'Footer'
}
</script>