import {useState} from "react";
import "./App.css";

function App() {
  const [numberToCheck, setNumberToCheck] = useState("");
  const [result, setResult] = useState("");

  function handleClick() {
    setResult(() => "");
    if (isNaN(Number(numberToCheck)) || numberToCheck.length !== 2) {
      alert("请输入一个两位数字");
      return;
    }

    for (let i = 1; i <= 999; i++) {
      let numString = String(i).padStart(3, "0");
      if (containsChars(numString, numberToCheck)) {
        console.log(`包含${i}`);
        setResult((prevResult) => prevResult + ` ${numString}`,);
      }
    }
  }

  function containsChars(numString, chars) {
    // 如何 chars 中的两个数字是一样的，则num中需要包含这两个数字两次 (如11就是要包含两个1)
    if (chars[0] === chars[1]) {
      return containsAtLeastTwoOfChar(numString, chars[0]);
    } else {
      const escapedChars = chars.split("").map((char) => escapeRegExp(char));
      const regex = new RegExp(`^(?=.*${escapedChars.join(")(?=.*")}).`);
      return regex.test(numString);
    }
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function containsAtLeastTwoOfChar(num, char) {
    // 转义特殊字符以确保它们在正则表达式中被正确处理
    const escapedChar = escapeRegExp(char);
    // 构建正则表达式，确保数字中至少包含两个相同的字符
    const regex = new RegExp(`^(.*${escapedChar})(.*${escapedChar}).*$`);
    return regex.test(num.toString());
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleClick();
    }
  }

  return (<div>
      <input
        type="text"
        placeholder="请输入一个数字，譬如 02"
        onChange={(e) => setNumberToCheck(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e)
        }}
      />
      <button onClick={() => handleClick()}>开始计算</button>
      <p>结果：{result}</p>
    </div>);
}

export default App;
