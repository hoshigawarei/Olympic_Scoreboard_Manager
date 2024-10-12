# Olympic_Scoreboard_Manager

该程序实现了一个统计奥运会项目比分的可视化工具，允许用户通过网页交互来查询分数、排名，并可随时更新可视化表示。用户可以通过输入框输入数值，然后点击相应按钮来进行操作。
![img_O][img_O.png]

## 访问链接
[https://hoshigawarei.github.io/Olympic_Scoreboard_Manager/]

## 主要功能

- **初始化数据**

  使用 HTML 表单接收用户输入（国家数量、男子项目数量、女子项目数量）。在 initialize() 函数中，根据用户输入的数量初始化 projects 和 countries 数组。
- **添加比赛结果**

  用户选择项目编号、结果类型（前五名或前三名），并输入结果。在 submitResults() 函数中，调用 addResults() 函数来更新 projects 和 countries 数据。addResults() 函数根据项目的前五名或前三名的规则更新各国的得分。
- **排序与显示**

  通过四个不同的按钮触发排序和显示功能。sortCountries() 函数根据排序标准（国家编号、总分、男子项目总分、女子项目总分）对 countries 数组进行排序。sortAndDisplay() 函数调用 visualizeChart() 创建相应的柱状图并显示。用 Chart.js 库绘制柱状图，图表实例保存在全局变量中，以便后续更新和销毁。
- **查询国家得分**

 用户输入国家编号。在 queryCountry() 函数中，获取指定国家在所有项目中的得分，并显示结果。将结果用柱状图形式显示在网页上。
- **查询项目前五名或前三名国家**

  用户输入项目编号。在 queryProject() 函数中，获取项目的前五名或前三名国家，并显示结果。结果直接以文本形式显示。

## 界面示例
![img_O2][img_O2.png]
![img_O3][img_O3.png]
![img_O4][img_O4.png]
