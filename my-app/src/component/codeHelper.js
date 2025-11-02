// src/component/codeHelper.js
export const CODE = {
  bubble: {
    cpp: `#include <bits/stdc++.h>
using namespace std;
void bubbleSort(vector<int>& a){
  bool swapped=true; int n=a.size();
  for(int i=0; i<n-1 && swapped; ++i){
    swapped=false;
    for(int j=0; j<n-1-i; ++j){
      if(a[j] > a[j+1]){ swap(a[j], a[j+1]); swapped=true; }
    }
  }
}
int main(){ vector<int> a={5,3,8,4,2}; bubbleSort(a); for(int x:a) cout<<x<<" "; }`,
    java: `import java.util.*;
public class Main{
  static void bubbleSort(int[] a){
    boolean swapped = true;
    for(int i=0; i<a.length-1 && swapped; i++){
      swapped = false;
      for(int j=0; j<a.length-1-i; j++){
        if(a[j] > a[j+1]){
          int t=a[j]; a[j]=a[j+1]; a[j+1]=t; swapped=true;
        }
      }
    }
  }
  public static void main(String[] args){
    int[] a={5,3,8,4,2}; bubbleSort(a); System.out.println(Arrays.toString(a));
  }
}`,
    py: `def bubble_sort(a):
    swapped = True
    n = len(a)
    i = 0
    while i < n-1 and swapped:
        swapped = False
        for j in range(0, n-1-i):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
                swapped = True
        i += 1

a = [5,3,8,4,2]
bubble_sort(a)
print(a)`
  },
  selection: {
    cpp: `#include <bits/stdc++.h>
using namespace std;
void selectionSort(vector<int>& a){
  int n=a.size();
  for(int i=0;i<n-1;i++){
    int p=i;
    for(int j=i+1;j<n;j++) if(a[j]<a[p]) p=j;
    if(p!=i) swap(a[i],a[p]);
  }
}
int main(){ vector<int>a={5,3,8,4,2}; selectionSort(a); for(int x:a) cout<<x<<" "; }`,
    java: `import java.util.*;
public class Main{
  static void selectionSort(int[] a){
    for(int i=0;i<a.length-1;i++){
      int p=i;
      for(int j=i+1;j<a.length;j++) if(a[j]<a[p]) p=j;
      if(p!=i){ int t=a[i]; a[i]=a[p]; a[p]=t; }
    }
  }
  public static void main(String[] args){
    int[] a={5,3,8,4,2}; selectionSort(a); System.out.println(Arrays.toString(a));
  }
}`,
    py: `def selection_sort(a):
    n = len(a)
    for i in range(n-1):
        p = i
        for j in range(i+1, n):
            if a[j] < a[p]:
                p = j
        if p != i:
            a[i], a[p] = a[p], a[i]

a=[5,3,8,4,2]
selection_sort(a)
print(a)`
  },
  insertion: {
    cpp: `#include <bits/stdc++.h>
using namespace std;
void insertionSort(vector<int>& a){
  for(int i=1;i<(int)a.size();i++){
    int key=a[i], j=i-1;
    while(j>=0 && a[j]>key){ a[j+1]=a[j]; j--; }
    a[j+1]=key;
  }
}
int main(){ vector<int>a={5,3,8,4,2}; insertionSort(a); for(int x:a) cout<<x<<" "; }`,
    java: `import java.util.*;
public class Main{
  static void insertionSort(int[] a){
    for(int i=1;i<a.length;i++){
      int key=a[i], j=i-1;
      while(j>=0 && a[j]>key){ a[j+1]=a[j]; j--; }
      a[j+1]=key;
    }
  }
  public static void main(String[] args){
    int[] a={5,3,8,4,2}; insertionSort(a); System.out.println(Arrays.toString(a));
  }
}`,
    py: `def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j+1] = a[j]
            j -= 1
        a[j+1] = key

a=[5,3,8,4,2]
insertion_sort(a)
print(a)`
  },
  merge: {
    cpp: `#include <bits/stdc++.h>
using namespace std;
void mergeVec(vector<int>& a,int l,int m,int r){
  vector<int>L(a.begin()+l,a.begin()+m+1), R(a.begin()+m+1,a.begin()+r+1);
  int i=0,j=0,k=l;
  while(i<(int)L.size() && j<(int)R.size()) a[k++]= (L[i]<=R[j]? L[i++]:R[j++]);
  while(i<(int)L.size()) a[k++]=L[i++];
  while(j<(int)R.size()) a[k++]=R[j++];
}
void mergeSort(vector<int>& a,int l,int r){
  if(l>=r) return;
  int m=(l+r)/2; mergeSort(a,l,m); mergeSort(a,m+1,r); mergeVec(a,l,m,r);
}
int main(){ vector<int>a={5,3,8,4,2}; mergeSort(a,0,(int)a.size()-1); for(int x:a) cout<<x<<" "; }`,
    java: `import java.util.*;
public class Main{
  static void merge(int[] a,int l,int m,int r){
    int n1=m-l+1, n2=r-m;
    int[] L=new int[n1], R=new int[n2];
    for(int i=0;i<n1;i++) L[i]=a[l+i];
    for(int j=0;j<n2;j++) R[j]=a[m+1+j];
    int i=0,j=0,k=l;
    while(i<n1 && j<n2) a[k++]=(L[i]<=R[j]?L[i++]:R[j++]);
    while(i<n1) a[k++]=L[i++];
    while(j<n2) a[k++]=R[j++];
  }
  static void mergeSort(int[] a,int l,int r){
    if(l>=r) return;
    int m=(l+r)/2; mergeSort(a,l,m); mergeSort(a,m+1,r); merge(a,l,m,r);
  }
  public static void main(String[] args){
    int[] a={5,3,8,4,2}; mergeSort(a,0,a.length-1); System.out.println(Arrays.toString(a));
  }
}`,
    py: `def merge_sort(a):
    def rec(l, r):
        if l >= r: return
        m = (l + r) // 2
        rec(l, m); rec(m+1, r)
        i, j = l, m+1
        tmp = []
        while i<=m and j<=r:
            if a[i] <= a[j]:
                tmp.append(a[i]); i+=1
            else:
                tmp.append(a[j]); j+=1
        tmp.extend(a[i:m+1]); tmp.extend(a[j:r+1])
        a[l:r+1] = tmp
    rec(0, len(a)-1)

a=[5,3,8,4,2]
merge_sort(a)
print(a)`
  },
  quick: {
    cpp: `#include <bits/stdc++.h>
using namespace std;
int part(vector<int>& a,int l,int r){
  int p=a[r], i=l-1;
  for(int j=l;j<r;j++) if(a[j]<=p) { i++; swap(a[i],a[j]); }
  swap(a[i+1],a[r]); return i+1;
}
void quickSort(vector<int>& a,int l,int r){
  if(l<r){ int q=part(a,l,r); quickSort(a,l,q-1); quickSort(a,q+1,r); }
}
int main(){ vector<int>a={5,3,8,4,2}; quickSort(a,0,(int)a.size()-1); for(int x:a) cout<<x<<" "; }`,
    java: `import java.util.*;
public class Main{
  static int part(int[] a,int l,int r){
    int p=a[r], i=l-1;
    for(int j=l;j<r;j++) if(a[j]<=p){ i++; int t=a[i]; a[i]=a[j]; a[j]=t; }
    int t=a[i+1]; a[i+1]=a[r]; a[r]=t; return i+1;
  }
  static void quickSort(int[] a,int l,int r){
    if(l<r){ int q=part(a,l,r); quickSort(a,l,q-1); quickSort(a,q+1,r); }
  }
  public static void main(String[] args){
    int[] a={5,3,8,4,2}; quickSort(a,0,a.length-1); System.out.println(Arrays.toString(a));
  }
}`,
    py: `def partition(a, l, r):
    p = a[r]; i = l - 1
    for j in range(l, r):
        if a[j] <= p:
            i += 1; a[i], a[j] = a[j], a[i]
    a[i+1], a[r] = a[r], a[i+1]
    return i + 1

def quick_sort(a, l=0, r=None):
    if r is None: r = len(a) - 1
    if l < r:
        q = partition(a, l, r)
        quick_sort(a, l, q-1)
        quick_sort(a, q+1, r)

a=[5,3,8,4,2]
quick_sort(a)
print(a)`
  },
  heap: {
    cpp: `#include <bits/stdc++.h>
using namespace std;
void heapify(vector<int>& a,int n,int i){
  int mx=i, l=2*i+1, r=2*i+2;
  if(l<n && a[l]>a[mx]) mx=l;
  if(r<n && a[r]>a[mx]) mx=r;
  if(mx!=i){ swap(a[i],a[mx]); heapify(a,n,mx); }
}
void heapSort(vector<int>& a){
  int n=a.size();
  for(int i=n/2-1;i>=0;i--) heapify(a,n,i);
  for(int i=n-1;i>0;i--){ swap(a[0],a[i]); heapify(a,i,0); }
}
int main(){ vector<int>a={5,3,8,4,2}; heapSort(a); for(int x:a) cout<<x<<" "; }`,
    java: `import java.util.*;
public class Main{
  static void heapify(int[] a,int n,int i){
    int mx=i, l=2*i+1, r=2*i+2;
    if(l<n && a[l]>a[mx]) mx=l;
    if(r<n && a[r]>a[mx]) mx=r;
    if(mx!=i){ int t=a[i]; a[i]=a[mx]; a[mx]=t; heapify(a,n,mx); }
  }
  static void heapSort(int[] a){
    int n=a.length;
    for(int i=n/2-1;i>=0;i--) heapify(a,n,i);
    for(int i=n-1;i>0;i--){ int t=a[0]; a[0]=a[i]; a[i]=t; heapify(a,i,0); }
  }
  public static void main(String[] args){
    int[] a={5,3,8,4,2}; heapSort(a); System.out.println(Arrays.toString(a));
  }
}`,
    py: `def heapify(a, n, i):
    mx = i
    l, r = 2*i + 1, 2*i + 2
    if l < n and a[l] > a[mx]: mx = l
    if r < n and a[r] > a[mx]: mx = r
    if mx != i:
        a[i], a[mx] = a[mx], a[i]
        heapify(a, n, mx)

def heap_sort(a):
    n = len(a)
    for i in range(n//2 - 1, -1, -1): heapify(a, n, i)
    for i in range(n-1, 0, -1):
        a[0], a[i] = a[i], a[0]
        heapify(a, i, 0)

a=[5,3,8,4,2]
heap_sort(a)
print(a)`
  }
};

export const getLangsFor = (slug) => {
  const entry = CODE[slug] || {};
  const langs = [];
  if (entry.cpp) langs.push({ key: "cpp", label: "C++" });
  if (entry.java) langs.push({ key: "java", label: "Java" });
  if (entry.py) langs.push({ key: "py", label: "Python" });
  return langs;
};

export const getCode = (slug, langKey) => {
  const pack = CODE[slug];
  if (!pack) return null;
  if (langKey === "cpp") return pack.cpp;
  if (langKey === "java") return pack.java;
  return pack.py; // default py
};
