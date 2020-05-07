import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
    id?: number;
    testName: string;
    pointsPossible: number;
    pointsReceived: number;
    percentage: number;
    grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<any> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const tests = JSON.parse(localStorage.getItem('tests'));
    if(tests && tests.length > 0) {
      this.tests = tests;
    } else {
      this.tests = await this.loadTestsfromJson();
    }
    console.log('this.tests from ngOninit', this.tests)

  }

  async loadTestsfromJson() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();
  }

  addTest(test: any) {
    const contact = {
      id: 1,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    };
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }

  deleteTest(index: number) {
    this.tests.splice(index, 1);
    this.saveToLocalStorage();
}

  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }

  computeGrade() {
    this.calculate();
  }

  calculate() {
    let total = 0;
    for(let i = 0; i < this.tests.length; i++) {
      total += this.tests[i];
    }
  }
}