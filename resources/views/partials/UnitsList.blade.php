<ul >
    @foreach ($units as $unit)
        <li>
            <code>{{$unit->name}}</code>
                @if ($unit->children()->count())
                    {{-- {{dd($unit->children)}} --}}
                    @include('partials.UnitsList',['units' => $unit->children])
                @endif
        </li>
    @endforeach
</ul>