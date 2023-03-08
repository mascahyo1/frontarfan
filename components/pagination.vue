<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-if="data.start > 1"><nuxt-link :class="{'page-link':1}" :to="{name:data.url, query:{page:data.start-1}}">Previous</nuxt-link></li>
                
                    <li v-for="pl in pageList" class="page-item"><nuxt-link  :class="{'active':pl.active, 'page-link': 1}"  :to="{name:data.url, query:{page:pl.pageNumber}}" >{{ pl.pageNumber }}</nuxt-link></li>
                
                <li class="page-item" v-if="data.start < data.total / data.limitPagination"><nuxt-link :class="{'page-link': 1}" :to="{name:data.url, query:{page:parseFloat(data.start)+1}}">Next</nuxt-link></li>
            </ul>
        </nav>
    </div>    
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            prev: false,
            next: false,
            startPagination: 1,
            finishPagination: 1,
            indexPagination: 0,
            pageList:[]
        }
    },
    methods: {
        async paginateData() {
            let i=0
            if(parseFloat(this.data.start) > 1) {
                this.startPagination = parseFloat(this.data.start) - 1
            } else {
                this.startPagination = parseFloat(this.data.start)
            } 
            this.finishPagination = (this.data.total) / this.data.limitPagination
            if(this.finishPagination >= parseFloat(this.data.start) +1) {
                this.finishPagination = parseFloat(this.data.start) + 1
            }
            
            // console.log(this.data.total)
            // console.log(this.data.total - this.data.limitPagination)
            console.log('start',this.startPagination)
            console.log(this.data.start)
            console.log(this.data.total)
            console.log(this.finishPagination)
            this.pageList = []
            this.indexPagination = 0
            for(i=this.startPagination;parseFloat(i)<=Math.ceil(parseFloat(this.finishPagination));i++) {
                this.pageList[this.indexPagination] = {'pageNumber': i, 'active': i == this.data.start, 'disabled':0}
                this.indexPagination++
            }

            // for(i=0;i * this.data.limitPagination<this.data.total;i++) {
            //     this.pageList[i] = {'pageNumber': i+1, 'active': i == this.data.start - 1, 'disabled':0}
            // }
        }
    },
    watch: {
        data() {
            
            this.paginateData()
            // let i=0
            // for(i=0;i * this.data.limitPagination<this.data.total;i++) {
            //     this.pageList[i] = {'pageNumber': i+1, 'active': i == this.data.start - 1, 'disabled':0}
            // }
            
        },
        
        '$route.query.page': function (val) {
            this.paginateData()
        }
    },
}
</script>
