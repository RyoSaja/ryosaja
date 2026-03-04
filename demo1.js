// demo.js

// 1. Import Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 2. Supabase URL & Publishable Key
const SUPABASE_URL = 'https://abcd1234.supabase.co' // ganti sesuai project Anda
const SUPABASE_ANON_KEY = 'sb_publishable_poLEjS5CTArJ_Y4POx-H0w_b1FoIWlC' // publishable key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 3. Fungsi simpan data ke Supabase
async function saveSensorData(data) {
    const { temperature, humidity, infrared, current_voltage } = data
    const { error } = await supabase
        .from('sensor_data')
        .insert([
            {
                temperature,
                humidity,
                infrared,
                current_voltage
            }
        ])
    if (error) {
        console.error('Gagal menyimpan data:', error.message)
    } else {
        console.log('Data berhasil disimpan!')
    }
}

// 4. Contoh data sensor (misal dari MQTT)
function getSensorData() {
    // Di sini bisa diganti sesuai data nyata dari sensor / MQTT
    return {
        temperature: Math.floor(Math.random() * 35) + 15,
        humidity: Math.floor(Math.random() * 50) + 30,
        infrared: Math.random() > 0.5 ? true : false,
        current_voltage: (Math.random() * 5).toFixed(2)
    }
}

// 5. Simulasi update data tiap 5 detik
setInterval(() => {
    const data = getSensorData()
    console.log('Data baru:', data)
    saveSensorData(data) // simpan ke Supabase
}, 5000)