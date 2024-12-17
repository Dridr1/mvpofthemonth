/*  <tr>
        <td>1</td>
        <td>Player 1</td>
        <td>100%</td>
        <td>10</td>
        <td>0</td>
    </tr> */

const table = document.querySelector('.table-content');
const lastUpdated = document.querySelector('.update-time');
const baseUrl = "https://mvpotm.onrender.com";
const printdata = async () => {
    table.innerHTML = '';
    lastUpdated.innerHTML = '';
    try {
        const response = await axios.get(`${baseUrl}/ranking`);
        const data = response.data;
        console.log(data)
        data.results.forEach((player, index) => {
            const tr = document.createElement('tr');
            const winRate = (player.winRate).toFixed(2) + '%';
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td class="player-name">${player.gameName}</td>
            <td>${winRate}</td>
            <td>${player.wins}</td>
            <td>${player.lose}</td>
            `;
            table.appendChild(tr);
        });
        console.log(data.lastUpdated);
        lastUpdated.innerHTML = `Última atualização em: ${data.lastUpdated}`;

    } catch (error) {
        console.log(error);
    }
}

const updateRanking = async () => {
    try {
        toggleLoading();
        const response = await axios.post(`${baseUrl}/ranking`);
        console.log(response.data)
        printdata();
        toggleLoading();
    } catch (error) {
        console.log(error);
        toggleLoading();
        window.alert("CALMA CARAIO, JÁ JÁ CARREGA");
    }
}

const toggleLoading = () => {    
    const loading = document.querySelector('.loading');
    loading.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', printdata);