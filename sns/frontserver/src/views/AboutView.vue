<template>
<div>
  <h1>{{result}}</h1>
</div>
</template>


<script>
import axios from 'axios';
export default{ 
  name:'',
  components:{},
  computed:{},
  data(){
    return{
      result:'',
    };
  },
  setup(){},
  created(){},
  mounted(){
    this.test();
  },
  unmounted(){},
  methods:{
    async test(){
      const res = await axios.get('http://localhost:3000/');
      console.log(res.data);
      this.result = res.data;
    }
  },
  watch:{}
}
</script>
