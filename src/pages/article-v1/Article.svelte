<script>
    import Article from "./ArticleWrap.svelte";
</script>

<div class="page">
    <Article>
        <!-- Headings and Paragraphs -->
        <h1 class="border-bottom">Heading h1</h1>
        <h2 class="border-bottom">Heading h2</h2>
        <h3>Heading h3</h3>
        <h4>Heading h4</h4>
        <h5>Heading h5</h5>
        <h6>Heading h6</h6>
    
        <h2 class="border-bottom">Paragraph</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore doloribus nobis error repellat vitae, sit quasi
            earum eveniet necessitatibus architecto alias officia nemo accusamus ratione, delectus sint aut porro nam.
        </p>
    
        <!-- Text decoration -->
        <h2 class="border-bottom">Decoration</h2>
        <div class="flex">
            <span> <i>Italic text</i> </span>
            <span> <b>Bold text</b> </span>
            <span> <u>Underline text</u> </span>
            <span> <s>Strikethrough text</s> </span>
            <span> <q>Quote text</q> </span>
            <span> <a href="/#">Anchor / Link</a> </span>
            <span> Highlight <mark>text</mark> </span>
            <span> 2<sup>16</sup> </span>
            <span> A<sub>b</sub> </span>
        </div>
    
        <!-- Lists -->
        <h2 class="border-bottom">Lists</h2>
        <h3>Ordered List</h3>
        <ol>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ol>
        <h3>Unordered List</h3>
        <ul>
            <li>List Item</li>
            <li>
                List Item with sub points
                <ul>
                    <li>List Item</li>
                    <li>List Item</li>
                </ul>
            </li>
            <li>List Item with text that wraps to the next line if the width is small enough</li>
            <li>
                Last List Item
                <ol>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ol>
            </li>
        </ul>
        <h3>Detail List</h3>
        <dl>
            <dt>Term</dt>
            <dd>Detail 1</dd>
            <dd>Detail 2</dd>
            <dt>Term</dt>
            <dd>Detail 1 with text that wraps to the next line if the width is small enough</dd>
            <dd>Detail 2</dd>
        </dl>
        
        <!-- Block Text -->
        <h2 class="border-bottom">Code and Quotes</h2>
        <h3>Code</h3>
        <p>
            <span>Here is a code element:</span>
            <code>const app = document.getElementById('app')</code>
            followed by a pre code block
        </p>
        <h3>Code Block</h3>
        <div>
            <pre><code>{`// Sort by id
array.sort(function (a, b) {
    let x = a.id.toLowerCase();
    let y = b.id.toLowerCase();
    if (x < y) {return 1;}
    if (x > y) {return -1;}
    return 0;
});`}</code></pre>
        </div>
        <h3>Blockquote</h3>
        <blockquote class="quote-bg">
            <p class="indent">
                In the beginning the Universe was created. This has made a lot of people very angry and has been widely
                regarded as a bad move.
            </p>
            <cite>Douglas Adams</cite>
        </blockquote>
    
        <!-- Horizontal Rule -->
        <h2 class="border-bottom">Horizontal Rule</h2>
        <p>Text above</p>
        <hr>
        <p>Text below</p>
        
        <!-- Images -->
        <h2 class="border-bottom">Images</h2>
        <img src="./images/beach.png" alt="beach.png">
        <img src="./images/happy.png" alt="happy.png">
    
        <!-- Tables -->
        <h2 class="border-bottom">Tables</h2>
        <h3>Default Table</h3>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Heading 1</th>
                        <th>Heading 2</th>
                        <th>Heading 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1, Data 1</td>
                        <td>Row 1, Data 2</td>
                        <td>Row 1, Data 3</td>
                    </tr>
                    <tr>
                        <td>Row 2, Data 1</td>
                        <td>Row 2, Data 2</td>
                        <td>Row 2, Data 3</td>
                    </tr>
                    <tr>
                        <td>Row 3, Data 1</td>
                        <td>Row 3, Data 2</td>
                        <td>Row 3, Data 3</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Table using some <code>./utilities.css</code> classes</h3>
        <div class="overflow" style="height: 40vh;">
            <table class="fill-width freeze-header color-alt-rows border-all nowrap">
                <thead>
                    <tr><th>Symbol</th><th>Dec</th><th>Hex</th><th>Binary</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td>A</td><td>65</td><td>41</td><td>1000001</td><td>Uppercase A</td></tr>
                    <tr><td>B</td><td>66</td><td>42</td><td>1000010</td><td>Uppercase B</td></tr>
                    <tr><td>C</td><td>67</td><td>43</td><td>1000011</td><td>Uppercase C</td></tr>
                    <tr><td>D</td><td>68</td><td>44</td><td>1000100</td><td style="max-width: 20ch;">Uppercase D 0123456789 0123456789 0123456789 0123456789 0123456789</td></tr>
                    <tr><td>E</td><td>69</td><td>45</td><td>1000101</td><td>Uppercase E</td></tr>
                    <tr><td>F</td><td>70</td><td>46</td><td>1000110</td><td>Uppercase F</td></tr>
                    <tr><td>G</td><td>71</td><td>47</td><td>1000111</td><td>Uppercase G</td></tr>
                    <tr><td>H</td><td>72</td><td>48</td><td>1001000</td><td>Uppercase H</td></tr>
                    <tr><td>I</td><td>73</td><td>49</td><td>1001001</td><td>Uppercase I</td></tr>
                    <tr><td>J</td><td>74</td><td>4A</td><td>1001010</td><td>Uppercase J</td></tr>
                    <tr><td>K</td><td>75</td><td>4B</td><td>1001011</td><td>Uppercase K</td></tr>
                    <tr><td>L</td><td>76</td><td>4C</td><td>1001100</td><td>Uppercase L</td></tr>
                    <tr><td>M</td><td>77</td><td>4D</td><td>1001101</td><td>Uppercase M</td></tr>
                    <tr><td>N</td><td>78</td><td>4E</td><td>1001110</td><td>Uppercase N</td></tr>
                    <tr><td>O</td><td>79</td><td>4F</td><td>1001111</td><td>Uppercase O</td></tr>
                    <tr><td>P</td><td>80</td><td>50</td><td>1010000</td><td>Uppercase P</td></tr>
                    <tr><td>Q</td><td>81</td><td>51</td><td>1010001</td><td>Uppercase Q</td></tr>
                    <tr><td>R</td><td>82</td><td>52</td><td>1010010</td><td>Uppercase R</td></tr>
                    <tr><td>S</td><td>83</td><td>53</td><td>1010011</td><td>Uppercase S</td></tr>
                    <tr><td>T</td><td>84</td><td>54</td><td>1010100</td><td>Uppercase T</td></tr>
                    <tr><td>U</td><td>85</td><td>55</td><td>1010101</td><td>Uppercase U</td></tr>
                    <tr><td>V</td><td>86</td><td>56</td><td>1010110</td><td>Uppercase V</td></tr>
                    <tr><td>W</td><td>87</td><td>57</td><td>1010111</td><td>Uppercase W</td></tr>
                    <tr><td>X</td><td>88</td><td>58</td><td>1011000</td><td>Uppercase X</td></tr>
                    <tr><td>Y</td><td>89</td><td>59</td><td>1011001</td><td>Uppercase Y</td></tr>
                    <tr><td>Z</td><td>90</td><td>5A</td><td>1011010</td><td>Uppercase Z</td></tr>
                </tbody>
            </table>
        </div>
    
        <!-- Buttons / Range -->
        <h2 class="border-bottom">Buttons</h2>
        <div class="flex">
            <button>Button Tag</button>
            <button disabled>Button disabled</button>
            <input type="button" value="Button Type" />
            <input type="button" value="Button Type disabled" disabled/>
            <input type="reset" value="Reset Type" />
            <input type="submit" value="Submit Type" />
            <input type="file" />
        </div>
    
        <!-- Inputs -->
        <h2 class="border-bottom">Inputs</h2>
        <div>
            <label>
                Text Type <br />
                <input type="text" placeholder="placeholder..." />
            </label>
        </div>
        <div>
            <label>
                Password Type <br />
                <input type="password" placeholder="password..." />
            </label>
        </div>
        <div>
            <label>
                Number Type <br />
                <input type="number" placeholder="420..." />
            </label>
        </div>
        <div>
            <label>
                Date <br />
                <input type="date" />
            </label>
        </div>
        <div>
            <label>
                Time <br />
                <input type="time" />
            </label>
        </div>
        <div>
            <label>
                Color <br />
                <input type="color" />
            </label>
        </div>
        <div>
            <label>
                Select <br />
                <select>
                    <optgroup label="Optgroup 1">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </optgroup>
                    <optgroup label="Optgroup 2">
                        <option>Option 1</option>
                        <option>Option 2 with extra text</option>
                        <option>Option 3</option>
                    </optgroup>
                </select>
            </label>
        </div>
        <div>
            <label>
                Textarea <br />
                <textarea>Test</textarea>
            </label>
        </div>
    
        <!-- Checkbox / Radio -->
        <h2 class="border-bottom">Checkbox / Radio</h2>
        <h3>Checkbox</h3>
        <div>
            <input type="checkbox" name="chxSet1" id="chx1" />
            <label for="chx1">Not Checked</label>
        </div>
        <div>
            <input type="checkbox" name="chxSet1" id="chx2" checked />
            <label for="chx2">Checked</label>
        </div>
        <div>
            <input type="checkbox" name="chxSet1" id="chx3" disabled />
            <label for="chx3">Disabled</label>
        </div>
        <div>
            <input type="checkbox" name="chxSet1" id="chx4" disabled checked />
            <label for="chx4">Disabled and Checked</label>
        </div>
        <h3>Radio</h3>
        <div>
            <input type="radio" name="radioSet1" id="rad1" />
            <label for="rad1">Not Checked</label>
        </div>
        <div>
            <input type="radio" name="radioSet1" id="rad2" checked />
            <label for="rad2">Checked</label>
        </div>
        <div>
            <input type="radio" name="radioSet2" id="rad3" disabled />
            <label for="rad3">Disabled</label>
        </div>
        <div>
            <input type="radio" name="radioSet2" id="rad4" disabled checked />
            <label for="rad4">Disabled and Checked</label>
        </div>
    
        <!-- Details -->
        <h2 class="border-bottom">Details + Summary</h2>
        <details>
            <summary>Details</summary>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique in laboriosam incidunt at explicabo reprehenderit
            dolores. Eveniet, exercitationem sequi quis explicabo iure laudantium veritatis, aliquid odio, molestiae nulla assumenda
            pariatur.
        </details>
    </Article>
</div>

<!-- CSS -->
<style>
    .flex {
        display: flex;
        gap: var(--gap);
        flex-wrap: wrap;
    }
</style>
