import CustomButton from "./components/CustomButton";
import DropdownSelector from "./components/DropdownSelector";
import UtilityButton from "./components/UtilityButton";
import PageFooter from "./components/PageFooter";
const MainPage = () => {



    return (
        <div>
            {/* Main buttons section. 4 buttons -> 2 rows of 2 buttons */}
            <div>
                <div>
                    <CustomButton title="1" />
                    <CustomButton title="2" />
                </div>
                <div>
                    <CustomButton title="3" />
                    <CustomButton title="4" />
                </div>
            </div>
            {/* Utility buttons section. 2 buttons, to pin on top and to extend/collapse */}
            <div>
                <UtilityButton title="1" />
                <UtilityButton title="2" />
            </div>
            {/* Room, Specialist and Service selection dropdowns. 3 dropdowns, 1 per row */}
            <div>
                <DropdownSelector onClickHandler={(number) => console.log('1')} items={[]}/>
                <DropdownSelector onClickHandler={(number) => console.log('2')} items={[]}/>
                <DropdownSelector onClickHandler={(number) => console.log('3')} items={[]}/>
            </div>
            {/* Footer section. */}
            <PageFooter />
        </div>
    )
}

export default MainPage;