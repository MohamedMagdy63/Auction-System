import './Calender.css'
import {KeyboardArrowLeft,  KeyboardArrowRight} from '@material-ui/icons';
import { useEffect } from 'react';

export const Calender = () => {
    
    useEffect(()=>{
        const month_list = document.querySelector('.month_list')
        const month_picker = document.querySelector('.month_picker')
        const prev_year = document.querySelector('#prev_year')
        const next_year = document.querySelector('#next_year')

        const isCorrectYear = (year)=>{
            return(year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
        }
        const getFebDays = (year) => {
            return isCorrectYear(year) ? 29 : 28
        }
        const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        const generateCalender = (month,year) => {
            const days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            const calender_header_year = document.querySelector('#year')
            const calender_header_month = document.querySelector('.month_picker')
            const calender_days = document.querySelector('.calender_days')

            calender_days.innerHTML = ''

            let currDate = new Date()

            calender_header_month.innerHTML = month_names[month]
            calender_header_year.innerHTML = year

            let first_day = new Date(month, year, 1)
            for (let index = 0; index <= days_of_month[month] + first_day.getDay() - 1; index++) {
                let day = document.createElement('div')
                if (index >= first_day.getDay()) {
                    day.classList.add('calender-day-hover')
                    day.innerHTML = index - first_day.getDay() + 1
                    day.innerHTML += `<span></span>
                                     <span></span>
                                     <span></span>
                                     <span></span>`
                
                    if(index - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()){
                        day.classList.add('curr_day')
                    }
                }
                calender_days.appendChild(day)
            }


        }
        month_picker.onclick = () => {
            month_list.classList.add('show')
        }
        
        let currDate = new Date()
        let curr_month ={value: currDate.getMonth()} 
        let curr_year = {value: currDate.getFullYear()} 
        generateCalender(curr_month.value, curr_year.value)

        month_list.innerHTML = ''
        month_names.map((x,idx)=>{
            const month = document.createElement('div')
            month.innerHTML = `<div>${x}</div>`
            month.onclick = () => {
                month_list.classList.remove('show')
                curr_month.value = idx
                generateCalender(curr_month.value, curr_year.value)
            }
            month_list.appendChild(month)
        })

        prev_year.onclick = () =>{
            --curr_year.value
            generateCalender(curr_month.value, curr_year.value)
        }
        next_year.onclick = () =>{
            ++curr_year.value
            generateCalender(curr_month.value, curr_year.value)
        }
    
    })

  return (
    <div className='calender'>
        <div className="calender_header">
            <div className="month_picker">
                Novamber
            </div>
            <div className="year_picker">
                <span className="year_change" id="prev_year">
                    <KeyboardArrowLeft/>
                </span>
                <span id="year">2023</span>
                <span className="year_change" id="next_year">
                    <KeyboardArrowRight/>
                </span>
            </div>
        </div>
        <div className="calender_body">
            <div className="calender_weak_day">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className="calender_days">
                <div>
                    1
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <div className="month_list"></div>
    </div>
  )
}
