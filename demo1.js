// 1. Import Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 2. Supabase URL & Publishable Key
const SUPABASE_URL = 'https://jmolhkbvczwotlzkbohi.supabase.co' // ganti sesuai project Anda
const SUPABASE_ANON_KEY = 'sb_publishable_poLEjS5CTArJ_Y4POx-H0w_b1FoIWlC' // publishable key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 3. Fungsi simpan data ke Supabase
async function saveSensorData(data) {
    if (!data.temperature && !data.humidity) return; // pastikan ada data
    const { temperature, humidity, infrared, current_voltage } = data
    const { error } = await supabase
        .from('sensor_data')
        .insert([
            { temperature, humidity, infrared, current_voltage }
        ])
    if (error) {
        console.error('Gagal menyimpan data:', error.message)
    } else {
        console.log('Data berhasil disimpan!', data)
    }
}

// 4. Ambil data sensor dari demo.js
function getSensorData() {
    return window.sensorData || null
}

// 5. Simpan data tiap 5 detik
setInterval(() => {
    const data = getSensorData()
    if (data) {
        saveSensorData(data)
    }
}, 5000)
