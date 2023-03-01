async function getAchievement(year) {
    const res = await axios.post(`https://private-aded43-bee3054.apiary-mock.com/getAchievement?year=${year}`)
    return res
}


export const salesData = year => getAchievement(year)

async function aa(){
    const res = await axios.post(`https://private-aded43-bee3054.apiary-mock.com/getSalesList?month=202301`)
    console.log(res.data);
}
aa()