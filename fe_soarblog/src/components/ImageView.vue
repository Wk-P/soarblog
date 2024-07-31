<template>
    <ul>
        <li v-for="(value, key) in urlsResponseTimeData" :key="key">
            {{ key }}: {{ value }} ms
        </li>
    </ul>
</template>
<script lang="ts" setup name="ImageView">
import { onMounted, ref } from 'vue';


const urlsResponseTimeData = ref<{ [key: string]: number }>({
    "www.baidu.com": 0,
    "www.bilibili.com": 0,
    "www.google.com": 0,
    "www.example.com": 0,
    "www.pusan.ac.kr/kor/Main.do": 0,
});

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
        for (const key of Object.keys(urlsResponseTimeData.value)) {
            const responseTime = await testConnectionSpeed(key);
            urlsResponseTimeData.value[key] = responseTime;
        }
    }, 3000); // 调整时间间隔为 10 秒（10000 毫秒）以避免频繁请求
})

</script>
<style scoped>
ul {
    list-style: none;
}
</style>