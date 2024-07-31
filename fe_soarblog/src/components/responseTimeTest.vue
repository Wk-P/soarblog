<template>
    <ul>
        <li v-for="(obj, index) in urlsResponseTimeData" :key="index">
            {{ obj.name }}: {{ obj.responseTime }} ms
        </li>
    </ul>
</template>
<script lang="ts" setup name="ImageView">
import { onMounted, ref } from 'vue';

interface URL {
    name: string,
    responseTime: number,
    url: string
}


const urlsResponseTimeData = ref<Array<URL>>([
    { name: "百度", responseTime: 0, url: "www.baidu.com" }, 
    { name: "BILIBILI", responseTime: 0, url: "www.bilibili.com" }, 
    { name: "谷歌", responseTime: 0, url: "www.google.com" }, 
    { name: "example", responseTime: 0, url: "www.example.com" }, 
    { name: "부산대", responseTime: 0, url: "www.pusan.ac.kr/kor/Main.do" }, 
    { name: "Chatgpt", responseTime: 0, url: "chatgpt.com" }, 
    { name: "Aliyun", responseTime: 0, url: "account.aliyun.com" }, 
    { name: "CSDN", responseTime: 0, url: "blog.csdn.net" }, 
    
]);

async function testConnectionSpeed(url: string): Promise<number> {
    const startTime = Date.now();
    try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        await response.text(); // or await response.json() depending on your needs
        const endTime = Date.now();
        return endTime - startTime;
    } catch (err: any) {
        console.error(err.message);
        return -1; // 返回 -1 表示错误
    }
}

onMounted(() => {
    setInterval(async () => {
        for (const key in urlsResponseTimeData.value) {
            const targetUrl = urlsResponseTimeData.value[key].url;
            const responseTime = await testConnectionSpeed(targetUrl);
            urlsResponseTimeData.value[key].responseTime = responseTime;
        }
    }, 3000); // 调整时间间隔为 10 秒（10000 毫秒）以避免频繁请求
})

</script>
<style scoped>
ul {
    list-style: none;
}
</style>