const lessons = [
  {
    id: "basics",
    title: "01 · CLI Dasar",
    tag: "Fondasi",
    text: "Modul memperkenalkan sintaks umum perintah Linux: perintah [option...] [argumen...]. Perintah Linux bersifat case-sensitive. Bagian ini menjadi fondasi sebelum masuk ke filesystem dan administrasi sistem.",
    cards: [
      ["man <command>", "Membuka dokumentasi/help manual sebuah perintah."],
      ["pwd", "Menampilkan current working directory."],
      ["ls [option]", "Menampilkan isi direktori."],
      ["cd <dir>", "Berpindah direktori."],
      ["tty", "Mengetahui virtual terminal yang sedang digunakan."],
      ["logout", "Keluar dari sesi user."],
    ],
    example: `$ pwd
/home/student
$ ls -la
$ cd Documents
$ tty
/dev/pts/0
$ man ls`,
    note: "Dokumen juga membahas login, virtual terminal Alt+F1–F7, reboot/shutdown, dan pembatalan proses dengan Ctrl+C/Ctrl+Z. Contoh tersebut berasal dari lingkungan Linux lama, jadi jangan menjalankan perintah reboot/shutdown saat demo kecuali memang diperlukan.",
  },
  {
    id: "files",
    title: "02 · File & Direktori",
    tag: "Filesystem",
    text: "Setelah memahami navigasi, latihan diarahkan ke pembuatan dan manipulasi file/direktori. Fokuskan demo pada operasi yang aman di folder latihan.",
    cards: [
      ["mkdir <dir>", "Membuat direktori."],
      ["touch <file>", "Membuat file kosong atau memperbarui timestamp."],
      ["cp <src> <dst>", "Menyalin file/direktori."],
      ["mv <src> <dst>", "Memindahkan atau mengganti nama."],
      ["rm <file>", "Menghapus file."],
      ["cat <file>", "Menampilkan isi file."],
    ],
    example: `$ mkdir latihan-linux
$ cd latihan-linux
$ touch catatan.txt
$ echo "Belajar CLI" > catatan.txt
$ cat catatan.txt
Belajar CLI
$ cp catatan.txt backup.txt
$ ls -l`,
    note: "Untuk demo, buat satu folder khusus seperti ~/linux-lab. Hindari bereksperimen dengan rm pada folder sistem.",
  },
  {
    id: "permissions",
    title: "03 · Permission, User & Group",
    tag: "Administrasi",
    text: "Linux mengatur akses melalui owner, group, dan permission. Mode dasar ditampilkan dengan ls -l, lalu dapat diubah menggunakan chmod. Modul juga membahas user dan group.",
    cards: [
      ["ls -l", "Melihat owner/group dan permission file."],
      ["chmod 600 file", "Mengubah permission; owner dapat read/write."],
      ["chmod 644 file", "Owner read/write; group dan others read."],
      ["chown user file", "Mengubah owner (biasanya membutuhkan privilege)."],
      ["chgrp group file", "Mengubah group file."],
      ["useradd / userdel", "Membuat/menghapus user; administrasi sistem."],
    ],
    example: `$ ls -l catatan.txt
-rw-r--r-- 1 student student ... catatan.txt
$ chmod 600 catatan.txt
$ ls -l catatan.txt
-rw------- 1 student student ... catatan.txt`,
    note: "Permission dapat dibaca sebagai owner | group | others. Gunakan chmod pada file latihan milik sendiri. Perubahan user/group sistem memerlukan kehati-hatian dan sering membutuhkan sudo.",
  },
  {
    id: "bash",
    title: "04 · Bash Scripting",
    tag: "Shell",
    text: "Shell bukan hanya tempat mengetik command. Modul berlanjut ke variabel, input/output, kondisi, fungsi, dan pembuatan script. Tujuannya memahami bagaimana command dapat diotomatisasi.",
    cards: [
      ["echo", "Menampilkan teks/nilai."],
      ["read", "Membaca input user ke variabel."],
      ["export", "Mengekspos variabel ke environment."],
      ["if ... then ... fi", "Percabangan kondisi."],
      ["$(command)", "Command substitution."],
      ["bash script.sh", "Menjalankan shell script."],
    ],
    example: `#!/bin/bash
nama="Linux"
echo "Halo, $nama"

read -p "Nama kamu: " user
echo "Halo, $user"

if [ -f "catatan.txt" ]; then
  echo "File ditemukan"
else
  echo "File tidak ditemukan"
fi`,
    note: "Mulai dari script kecil. Simpan sebagai latihan.sh, beri permission executable bila diperlukan dengan chmod +x, lalu jalankan ./latihan.sh.",
  },
  {
    id: "process",
    title: "05 · Process & Thread",
    tag: "Concurrency",
    text: "Materi process membahas proses, memory, monitoring, job control, fork(), dan thread. Dokumen juga memberi contoh pthread serta latihan pembuatan dan termination thread.",
    cards: [
      ["ps", "Melihat process yang sedang berjalan."],
      ["top", "Monitoring proses dan resource secara kontinu."],
      ["jobs", "Melihat job background pada shell."],
      ["fg / bg", "Memindahkan job ke foreground/background."],
      ["kill <PID>", "Mengirim signal ke process."],
      ["free", "Melihat penggunaan memory."],
    ],
    example: `$ sleep 100 &
[1] 12345
$ jobs
[1]+  Running  sleep 100 &
$ ps
$ kill 12345`,
    note: "Untuk memahami fork(): parent mendapatkan PID child, sedangkan child menerima nilai return 0. Untuk thread, pthread_create membuat thread dan pthread_join menunggu thread selesai.",
  },
  {
    id: "kernel",
    title: "06 · Kernel Module & System Call",
    tag: "Kernel",
    text: "Kernel menangani hardware dan resource seperti memory/CPU, filesystem, serta komunikasi jaringan. Kernel module adalah kode yang dapat dimuat dan dilepas dari kernel. Dokumen membahas lsmod, modprobe, insmod, rmmod, modinfo, dan contoh hello module.",
    cards: [
      ["lsmod", "Melihat kernel modules yang sedang loaded."],
      ["modinfo <module>", "Melihat informasi sebuah module."],
      ["modprobe <module>", "Memuat module dengan menangani dependency."],
      ["insmod <file.ko>", "Memuat module dari file module."],
      ["rmmod <module>", "Melepas module."],
      ["make", "Digunakan dalam contoh build kernel module dengan kbuild."],
    ],
    example: `$ lsmod
$ modinfo <module>
$ sudo modprobe <module>
$ lsmod
$ sudo modprobe -r <module>`,
    note: "Dokumen menggunakan contoh path dan kernel 2.6.x yang sangat lama. Jangan menyalin path tersebut ke Fedora modern. Untuk demo kelas, cukup jelaskan konsep dan gunakan module yang memang tersedia di sistem.",
  },
  {
    id: "lfs",
    title: "07 · LFS",
    tag: "Advanced",
    text: "Linux From Scratch (LFS) dijelaskan sebagai metode membangun sistem Linux sendiri mulai dari source code. Modul menekankan pemahaman internal Linux, sistem yang sederhana, fleksibilitas, dan kontrol terhadap sistem.",
    cards: [
      ["LFS", "Linux From Scratch; membangun sistem dari source."],
      ["Source code", "Komponen dibangun dari kode sumber."],
      ["Dependencies", "Komponen Linux saling bergantung."],
      ["Customization", "Sistem dapat disusun sesuai kebutuhan."],
    ],
    example: `Konsep LFS:
Source code
    ↓
Toolchain
    ↓
Base system
    ↓
Libraries + utilities
    ↓
Kernel + boot configuration
    ↓
Linux system`,
    note: "Bagian LFS dalam dokumen berupa tujuan, teori, keuntungan, dan tugas membuat sistem Linux dengan LFS. Jangan menjadikan LFS sebagai latihan pertama; kuasai CLI, filesystem, permission, shell, dan process terlebih dahulu.",
  },
];

const nav = document.getElementById("nav");
const lessonEl = document.getElementById("lesson");
let current = 0;
const completed = new Set();

function renderNav() {
  nav.innerHTML = lessons
    .map(
      (l, i) =>
        `<button data-index="${i}" class="${i === 0 ? "active" : ""}">${l.title}</button>`,
    )
    .join("");
  nav
    .querySelectorAll("button")
    .forEach((b) => (b.onclick = () => showLesson(+b.dataset.index)));
}
function renderLessons() {
  lessonEl.innerHTML = lessons
    .map(
      (l, i) => `
    <article class="lesson ${i === 0 ? "active" : ""}" id="lesson-${l.id}">
      <div class="lesson-head">
        <div><div class="section-kicker">${l.tag.toUpperCase()}</div><h2>${l.title}</h2></div>
        <span class="tag">Materi ${String(i + 1).padStart(2, "0")}/${lessons.length}</span>
      </div>
      <p>${l.text}</p>
      <div class="grid">${l.cards.map((c) => `<div class="cmd-card"><code>${escapeHtml(c[0])}</code><p>${c[1]}</p></div>`).join("")}</div>
      <div class="section-kicker">CONTOH</div>
      <pre class="example">${escapeHtml(l.example)}</pre>
      <div class="note">⚠️ ${l.note}</div>
      <button class="primary-btn complete" data-index="${i}">${completed.has(i) ? "✓ Sudah dipelajari" : "Tandai selesai"}</button>
    </article>`,
    )
    .join("");
  document.querySelectorAll(".complete").forEach(
    (b) =>
      (b.onclick = () => {
        completed.add(+b.dataset.index);
        renderLessons();
        updateProgress();
        showLesson(current);
      }),
  );
}
function showLesson(i) {
  current = i;
  document
    .querySelectorAll(".lesson")
    .forEach((x, n) => x.classList.toggle("active", n === i));
  nav
    .querySelectorAll("button")
    .forEach((x, n) => x.classList.toggle("active", n === i));
  document
    .getElementById("materi")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}
function updateProgress() {
  const p = Math.round((completed.size / lessons.length) * 100);
  document.getElementById("progressBar").style.width = p + "%";
  document.getElementById("progressText").textContent = p + "%";
}
function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}

const output = document.getElementById("output"),
  input = document.getElementById("command");
const responses = {
  help: `Command aman yang tersedia:
  help        daftar command demo
  whoami      user aktif
  pwd         current directory
  ls -la      isi direktori
  uname -r    versi kernel (simulasi)
  date        tanggal/waktu`,
  whoami: "student",
  pwd: "/home/student/linux-lab",
  "ls -la": `total 20
drwxr-xr-x  3 student student 4096 linux-lab
-rw-r--r--  1 student student   42 catatan.txt
drwxr-xr-x  2 student student 4096 Documents
drwxr-xr-x  2 student student 4096 Downloads`,
  "uname -r": "6.x.x-fedora (simulasi)",
  date: new Date().toLocaleString("id-ID"),
};
function runCommand(cmd) {
  cmd = cmd.trim();
  if (!cmd) return;
  const out =
    responses[cmd] ??
    `bash: ${cmd}: command tersedia hanya sebagai konsep pada simulator ini.\nCoba: help`;
  output.innerHTML += `\n<span style="color:#999">$ ${escapeHtml(cmd)}</span>\n${escapeHtml(out)}`;
  output.scrollTop = output.scrollHeight;
}
document.getElementById("run").onclick = () => {
  runCommand(input.value);
  input.value = "";
};
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    runCommand(input.value);
    input.value = "";
  }
});
document
  .querySelectorAll(".quick-cmds button")
  .forEach((b) => (b.onclick = () => runCommand(b.dataset.cmd)));

const quizData = [
  [
    "Apa fungsi pwd?",
    ["Menghapus file", "Menampilkan direktori saat ini", "Mengubah permission"],
    1,
  ],
  [
    "Command untuk melihat permission file adalah?",
    ["ls -l", "cd", "touch"],
    0,
  ],
  [
    "Apa fungsi chmod?",
    ["Mengubah permission", "Membuat user", "Melihat process"],
    0,
  ],
  [
    "Apa fungsi fork() pada materi process?",
    ["Membuat proses baru", "Menghapus kernel module", "Mengubah group"],
    0,
  ],
  [
    "Apa konsep utama LFS?",
    [
      "Membangun sistem Linux dari source",
      "Mengganti desktop environment",
      "Menghapus semua package",
    ],
    0,
  ],
];
const quiz = document.getElementById("quiz");
quiz.innerHTML = quizData
  .map(
    (q, i) =>
      `<div class="question"><p>${i + 1}. ${q[0]}</p><div class="answers">${q[1].map((a, j) => `<button data-q="${i}" data-a="${j}">${a}</button>`).join("")}</div></div>`,
  )
  .join("");
quiz.querySelectorAll("button").forEach(
  (b) =>
    (b.onclick = () => {
      const q = quizData[+b.dataset.q],
        a = +b.dataset.a;
      const siblings = quiz.querySelectorAll(`[data-q="${b.dataset.q}"]`);
      siblings.forEach((x) => (x.disabled = true));
      b.classList.add(a === q[2] ? "correct" : "wrong");
      if (a !== q[2]) siblings[q[2]].classList.add("correct");
    }),
);

document.getElementById("menuBtn").onclick = () =>
  document.querySelector("aside").classList.toggle("open");
renderNav();
renderLessons();
updateProgress();
