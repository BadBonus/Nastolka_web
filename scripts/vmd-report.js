import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const now = new Date();
const timestamp = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
  `${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`,
].join("_");

const fileName = `${timestamp}_vmd_report.json`;
const reportsDir = path.join(process.cwd(), ".reports");

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const reportPath = path.join(reportsDir, fileName);

try {
  console.log(`--- Запуск анализа VMD ---`);
  let rawOutput = "";
  try {
    rawOutput = execSync(
      `npx vue-mess-detector analyze --output=json --exclude=multiAttributeElements --level=all`,
      {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
  } catch (childError) {
    rawOutput = (childError.stdout || "") + (childError.stderr || "");
  }

  // 1. Очистка от ANSI (цвета)
  const cleanOutput = rawOutput.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );

  // 2. Поиск JSON
  const jsonMatch = cleanOutput.match(/\{[\s\S]*\}/g);
  if (!jsonMatch) {
    throw new Error("JSON не найден в выводе команды.");
  }

  const finalJson = jsonMatch
    .reduce((a, b) => (a.length > b.length ? a : b))
    .trim();

  // Валидация
  try {
    JSON.parse(finalJson);
  } catch (e) {
    console.log("--- ОТЛАДКА ПРИ ОШИБКЕ ---");
    console.log("Сырой кусок (первые 100 симв):", finalJson.substring(0, 100));
    console.log(
      "Сырой кусок (последние 100 симв):",
      finalJson.substring(finalJson.length - 100),
    );
    throw new Error(`Невалидный формат JSON: ${e.message}`);
  }

  fs.writeFileSync(reportPath, finalJson);
  console.log(`--- Отчет сохранен: .reports/${fileName} ---`);

  console.log("--- Сводка (Table) ---");
  execSync(`npx vue-mess-detector analyze --output=table`, {
    stdio: "inherit",
  }); // ✅ был просто --output=table, но без флага это тоже верно
} catch (error) {
  console.error("Критическая ошибка:");
  console.error(error.message);
  process.exit(1);
}
