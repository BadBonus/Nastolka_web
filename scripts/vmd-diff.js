import fs from "fs";
import path from "path";

const reportsDir = path.join(process.cwd(), ".reports");

// Получаем список файлов, фильтруем только json и сортируем по дате (имени)
const files = fs
  .readdirSync(reportsDir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .reverse();

if (files.length < 2) {
  console.log("Нужно минимум 2 отчета для сравнения.");
  process.exit(0);
}

const current = JSON.parse(
  fs.readFileSync(path.join(reportsDir, files[0]), "utf8"),
);
const previous = JSON.parse(
  fs.readFileSync(path.join(reportsDir, files[1]), "utf8"),
);

console.log(`\nСравнение: ${files[1]} -> ${files[0]}`);
console.log("-------------------------------------------");

// В VMD структура может отличаться, проверим наличие summary
const getMetrics = (data) => ({
  health: data.healthScore || data.summary?.healthScore || 0,
  errors: data.totalErrors || data.summary?.totalErrors || 0,
  warnings: data.totalWarnings || data.summary?.totalWarnings || 0,
});

const curM = getMetrics(current);
const preM = getMetrics(previous);

const printDiff = (label, cur, pre) => {
  const diff = cur - pre;
  const emoji = diff < 0 ? "✅" : diff > 0 ? "⚠️" : "ℹ️";
  // Для HealthScore инвертируем логику: плюс - это хорошо
  const isHealth = label === "Health";
  const goodChange = isHealth ? diff > 0 : diff < 0;
  const finalEmoji = diff === 0 ? "➖" : goodChange ? "✅" : "⚠️";

  console.log(
    `${label.padEnd(10)}: ${pre} -> ${cur} (${diff > 0 ? "+" : ""}${diff}) ${finalEmoji}`,
  );
};

printDiff("Health", curM.health, preM.health);
printDiff("Errors", curM.errors, preM.errors);
printDiff("Warnings", curM.warnings, preM.warnings);
